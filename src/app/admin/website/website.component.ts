import { Component, OnInit } from '@angular/core';
import { ApiWebsiteService } from '../../services/api-website.service';
import { Website } from '../../model/Website';
import { Selector } from '../../model/Selector';
import { Observable, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {
  websites: Website[] = [];
  websitesWithSelectors: Website[] = [];
  loading: boolean = true;
  websiteId!: number; 
  constructor(private websiteService: ApiWebsiteService) { }

  ngOnInit(): void {
    this.loadWebsitesWithSelectors();
  }
  getObjectEntries(obj: any): any[] {
    if (obj) {
      return Object.entries(obj);
    } else {
      return [];
    }
  }
  logWebsitesWithSelectors(): void {
    this.websitesWithSelectors.forEach(website => {
      console.log("Website:", website.name);
      if (website.selectors) {
        website.selectors.forEach((selector: any, index: number) => {
          console.log(`Selector ${index + 1}:`, selector);
        });
      } else {
        console.log("No selectors found for website:", website.name);
      }
    });
  }
  loadWebsitesWithSelectors(): void {
    this.websiteService.getWebsites(1, 10).subscribe(
      websites => {
        this.loading = true;
        const observables: Observable<any>[] = [];

        websites.forEach(website => {
          observables.push(this.getSelectorsForWebsite(website.id));
        });

        forkJoin(observables).subscribe(
          results => {
            results.forEach((selectors, index) => {
              if (selectors && selectors.length > 0) {
                websites[index].selectors = selectors.map((selector: Selector) => selector.selectors);
              }
            });
            this.websitesWithSelectors = websites;
            console.log('Selectors and their types:', this.websitesWithSelectors);

            this.loading = false;
            this.logWebsitesWithSelectors();

          },
          error => {
            console.error('Error loading selectors:', error);
            this.loading = false;
          }
        );
      },
      error => {
        console.error('Error loading websites:', error);
        this.loading = false;
      }
    );
  }
  openWebsiteDialog(): void {
    let htmlContent = `
      <div class="container">
        <form>
          <div class="form-group row">
            <label for="name" class="col-sm-2 col-form-label">Nom:</label>
            <div class="col-sm-10">
              <input id="name" class="form-control" placeholder="Entrez le nom du site">
            </div>
          </div>
          <div class="form-group row">
            <label for="url" class="col-sm-2 col-form-label">URL:</label>
            <div class="col-sm-10">
              <input id="url" class="form-control" placeholder="Entrez l'URL du site">
            </div>
          </div>
          <div id="selectors-container" class="form-group row">
            <label class="col-sm-2 col-form-label">Sélecteurs:</label>
            <div class="col-sm-10">
              <div id="selector-1" class="row mb-2">
                <div class="col">
                  <input id="type-1" class="form-control type" placeholder="Type">
                </div>
                <div class="col">
                  <input id="selector-1" class="form-control selector" placeholder="Sélecteur">
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>`;

    Swal.fire({
      title: 'Ajouter Un Site',
      html: htmlContent,
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Valider',
      allowOutsideClick: () => !Swal.isLoading(),
      focusConfirm: false,
      footer: '<button id="add-selector-btn" class="btn btn-warning btn-sm">+ Ajouter autre sélecteur</button>',
      preConfirm: () => {
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const url = (document.getElementById('url') as HTMLInputElement).value;
        const selectors = this.getSelectorsFromInputs();
        if (name && url && selectors) {
          this.addWebsiteWithSelectors(name, url, selectors);
        } else {
          console.error('Nom, URL, et sélecteurs manquants.');
        }
      },
      didOpen: () => {
        const container = document.getElementById('selectors-container');
        if (container) {
          const addButton = document.getElementById('add-selector-btn');
          if (addButton) {
            addButton.onclick = () => {
              this.addSelectorInputs();
            };
          } else {
            console.error('Le bouton "Ajouter un sélecteur" est null.');
          }
        } else {
          console.error('Le conteneur est null.');
        }
      }

    });
  }

  addSelectorInputs(): void {
    const container = document.getElementById('selectors-container');
    if (container) {
      // Créer un nouvel élément div pour chaque nouveau sélecteur
      const newSelectorInputDiv = document.createElement('div');
      newSelectorInputDiv.classList.add('selector-input', 'row', 'mb-2');

      // Compter le nombre de sélecteurs déjà présents pour obtenir l'indice du prochain sélecteur
      const existingSelectors = container.querySelectorAll('.selector-input').length + 1;

      // Créer les éléments de label et d'input pour le nouveau sélecteur
      const label = document.createElement('label');
      label.setAttribute('for', `selector-${existingSelectors}`);
      label.classList.add('col-sm-2', 'col-form-label');
      label.textContent = `Sélecteur ${existingSelectors}:`;

      const typeInputDiv = document.createElement('div');
      typeInputDiv.classList.add('col-sm-5');
      const typeInput = document.createElement('input');
      typeInput.setAttribute('id', `type-${existingSelectors}`);
      typeInput.setAttribute('type', 'text');
      typeInput.setAttribute('placeholder', 'Type');
      typeInput.classList.add('form-control', 'type');

      const selectorInputDiv = document.createElement('div');
      selectorInputDiv.classList.add('col-sm-5');
      const selectorInput = document.createElement('input');
      selectorInput.setAttribute('id', `selector-${existingSelectors}`);
      selectorInput.setAttribute('type', 'text');
      selectorInput.setAttribute('placeholder', 'Sélecteur');
      selectorInput.classList.add('form-control', 'selector');

      // Ajouter les éléments créés au nouvel élément div
      typeInputDiv.appendChild(typeInput);
      selectorInputDiv.appendChild(selectorInput);
      newSelectorInputDiv.appendChild(label);
      newSelectorInputDiv.appendChild(typeInputDiv);
      newSelectorInputDiv.appendChild(selectorInputDiv);

      // Ajouter le nouvel élément div au conteneur des sélecteurs
      container.appendChild(newSelectorInputDiv);
    } else {
      console.error('Container is null.');
    }
  }



  getSelectorsFromInputs(): { type: string; selector: string }[] | null {
    const container = document.getElementById('selectors-container');
    if (container) {
      const selectorInputs = container.querySelectorAll('.selector-input');
      const selectors: { type: string; selector: string }[] = [];
      selectorInputs.forEach(input => {
        const typeInput = input.querySelector('.type') as HTMLInputElement;
        const selectorInput = input.querySelector('.selector') as HTMLInputElement;
        if (typeInput && selectorInput) {
          const type = typeInput.value;
          const selector = selectorInput.value;
          if (type && selector) {
            selectors.push({ type: type, selector: selector });
          }
        }
      });
      return selectors.length > 0 ? selectors : null;
    } else {
      console.error('Container is null.');
      return null;
    }
  }



  addWebsiteWithSelectors(name: string, url: string, selectors: any[]): void {
    const newWebsite: Website = { id: 0, name: name, url: url, selectors: selectors };
    this.websiteService.createWebsite(newWebsite).subscribe(
      response => {
        console.log('Website added successfully:', response);
        const websiteId = response.id;
        selectors.forEach(selector => {
          const newSelector: Selector = { id: 0, website: websiteId, selectors: selector };
          this.websiteService.createSelector(newSelector).subscribe(
            selectorResponse => {
              console.log('Selector added successfully:', selectorResponse);
            },
            selectorError => {
              console.error('Error adding selector:', selectorError);
            }
          );
        });
        this.loadWebsitesWithSelectors();
        Swal.fire(
          'Success!',
          'Site ajouté avec success.',
          'success'
        );
      },
      error => {
        console.error('Erreur ajout de site:', error);
        Swal.fire(
          'Error!',
          'Essayer une autre fois!!.',
          'error'
        );
      }
    );
  }

  getSelectorsForWebsite(websiteId: number): Observable<any> {
    return this.websiteService.getSelectorsForWebsite(websiteId);
  }
  getObjectKeys(obj: any): string[] {
    // Vérifiez si obj est défini et n'est pas null
    if (obj && typeof obj === 'object') {
      return Object.keys(obj);
    } else {
      return [];
    }
  }

  editWebsite(website: Website): void {
    Swal.fire({
      title: 'Edit Website',
      html:
        `Nom :<input id="name" class="swal2-input" value="${website.name}" placeholder="Name">
         URL :<input id="url" class="swal2-input" value="${website.url}" placeholder="URL">
         Selecteurs : <textarea id="selectors" class="swal2-textarea" placeholder="Sélecteurs" contenteditable="true">${JSON.stringify(website.selectors)}</textarea>`,
      focusConfirm: false,
      preConfirm: () => {
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const url = (document.getElementById('url') as HTMLInputElement).value;
        const selectors = JSON.parse((document.getElementById('selectors') as HTMLTextAreaElement).value);
        this.editWebsiteWithSelectors(website.id, name, url, selectors);
      }
    });
  }

  editWebsiteWithSelectors(websiteId: number, name: string, url: string, selectors: any): void {
    // Vérifier la structure de updatedWebsiteData avant l'envoi
    const updatedWebsiteData = {
      website: {
        websiteId: websiteId, // Assurez-vous que l'identifiant est inclus dans les données envoyées
        name: name,
        url: url
      },
      selectors: selectors
    };

    console.log('Structure de updatedWebsiteData :', updatedWebsiteData);

    // Envoyer les données à l'API Django
    this.websiteService.editWebsiteWithSelectors(websiteId, updatedWebsiteData).subscribe(
      response => {
        console.log('Website updated successfully:', response);
        this.loadWebsitesWithSelectors(); // Rafraîchir la liste des sites Web après la modification
      },
      error => {
        console.error('Error updating website:', error);
        // Gérer l'erreur ici
      }
    );
  }

  deleteWebsite(websiteId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this website!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Website ID to be deleted:', websiteId); // Afficher l'ID dans la console
        this.websiteService.deleteWebsite(websiteId).subscribe(
          response => {
            console.log('Website deleted successfully:', response);
            // Supprimer le site Web de la liste après la suppression réussie
            this.websitesWithSelectors = this.websitesWithSelectors.filter(website => website.id !== websiteId);
            Swal.fire(
              'Deleted!',
              'Your website has been deleted.',
              'success'
            );
          },
          error => {
            console.error('Error deleting website:', error);
            // Gérer l'erreur ici
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your website is safe :)',
          'error'
        );
      }
    });
  }


}