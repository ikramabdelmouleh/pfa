import { Component } from '@angular/core';
import { ApiWebsiteService } from '../services/api-website.service';
import { Produit } from '../model/Produit';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrl: './ecommerce.component.css'
})
export class EcommerceComponent {
  produits: Produit[] = [];
  searchTerm: string = ''; // New property for search term
  currentPage: number = 1;
  hasNextPage: boolean = false;
  hasPrevPage: boolean = false;
  totalPages: number = 1;
  maxVisiblePages: number = 5;

  constructor(private service: ApiWebsiteService) {}

  ngOnInit() {
    this.getProducts(this.searchTerm);
  }

  searchProducts(): void {
    // Vérifier si le terme de recherche n'est pas vide
    if (this.searchTerm.trim()) {
      // Si le terme de recherche n'est pas vide, appeler getProductsByName avec le terme de recherche et la page actuelle
      this.getProducts(this.searchTerm.trim());
    } else {
      // Si le terme de recherche est vide, réinitialiser la liste de produits avec la première page
      this.currentPage = 1;
      this.getProducts();
    }
  }
  
  getProducts(searchTerm = ''): void {
    if (searchTerm) {
      this.service.getDocuments(this.currentPage, searchTerm).subscribe(
        response => {
          // Filter results for search
          this.produits = response.results
            .filter((produit: any) => produit && produit.titre && produit.titre.toLowerCase().includes(searchTerm.toLowerCase()));
  
          // Calculate totalPages based on original results
          this.totalPages = Math.ceil(response.count / 20); // Assuming 'count' is the total product count
  
          this.hasPrevPage = this.currentPage > 1;
          this.hasNextPage = this.currentPage < this.totalPages;
        },
        error => {
          console.error(error);
        }
      );
    } else {
      this.service.getDocuments(this.currentPage).subscribe(
        response => {
          // Si aucun terme de recherche n'est spécifié, afficher tous les produits
          this.produits = response.results;
          this.totalPages = Math.ceil(response.count / 20);
          this.hasPrevPage = this.currentPage > 1;
          this.hasNextPage = this.currentPage < this.totalPages;
        },
        error => {
          console.error(error);
        }
      );
    }
  }
  

  nextPage() {
    if (this.hasNextPage) {
      this.currentPage++;
      this.getProducts(this.searchTerm); // Apply search term to next page
    }
  }

  prevPage() {
    if (this.hasPrevPage) {
      this.currentPage--;
      this.getProducts(this.searchTerm); // Apply search term to previous page
    }
  }

  getPageNumbers(): number[] {
    const startPage = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
    const endPage = Math.min(this.totalPages, startPage + this.maxVisiblePages - 1);
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  changePage(page: number) {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.getProducts(this.searchTerm); // Apply search term to new page
    }
  }

  getPageLabel(): string {
    return `Page ${this.currentPage} / ${this.totalPages}`;
  }

}
