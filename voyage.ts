import { Promise } from 'es6-promise';

class Sejour {
    constructor(private _nom: string, private _prix: number) {
    }

    toString(): string {
        return `Nom du séjour : ${this._nom}\nPrix : ${this._prix}€ TTC`;
    }

    get nom(): string {
        return this._nom;
    }

    get prix(): number {
        return this._prix;
    }

    set nom(nouveauNom) {
        this._nom = nouveauNom;
    }
}

class SejourService {

    constructor(private _listeSejours: Array<Sejour>) { }

    findByName(nom: string): Promise<Sejour> {
        return new Promise<Sejour>((resolve, reject) => {
            let leSejourEstTrouve: Boolean = false;
            this._listeSejours.forEach(sejour => {
                if (sejour.nom == nom) {
                    leSejourEstTrouve = true;
                    resolve(sejour);
                }
            });
            if (leSejourEstTrouve == false) {
                reject(`${nom} est un séjour inconnu au bataillon.`)
            }
        });
    }
}

const ruto: string = "I AM ERROR.";
const sejourTrouve: string = "Votre séjour a été trouvé !"
const troll: string = "Qui voudrait aller là-bas ?"

// option 1 : instancier une liste de séjours
const listeSejours: Array<Sejour> = [new Sejour("Rio De Janeiro", 800), new Sejour("Praia", 42)];

// option 2 : instancier 2 séjours et les ajouter dans une liste
const nantes: Sejour = new Sejour("Nantes", 0);
const paris: Sejour = new Sejour("Paris", 100);

listeSejours.push(nantes);
listeSejours.push(paris);

// créer une instance de la classe SejourService pour invoquer la méthode findByName()
const serviceSejour: SejourService = new SejourService(listeSejours);

const rechercheNantes$: Promise<Sejour> = serviceSejour.findByName("Nantes");
rechercheNantes$
    .then(sejour => console.log(`${sejourTrouve}\n-> ${sejour.toString()}\n`))
    .catch(error => `${ruto}\n${error}\n${troll}`);

const rechercheParis$: Promise<Sejour> = serviceSejour.findByName("Paris");
rechercheParis$
    .then(sejour => console.log(`${sejourTrouve}\n-> ${sejour.toString()}\n`))
    .catch(error => `${ruto}\n${error}\n${troll}`);

const rechercheRioDeJaneiro$: Promise<Sejour> = serviceSejour.findByName("Rio De Janeiro");
rechercheRioDeJaneiro$
    .then(sejour => console.log(`${sejourTrouve}\n-> ${sejour.toString()}\n`))
    .catch(error => `${ruto}\n${error}\n${troll}`);

const recherchePraia$: Promise<Sejour> = serviceSejour.findByName("Praia");
recherchePraia$
    .then(sejour => console.log(`${sejourTrouve}\n-> ${sejour.toString()}\n`))
    .catch(error => console.log(`${ruto}\n${error}\n${troll}`));

const recherchePunthusLesBains$: Promise<Sejour> = serviceSejour.findByName("PunthusLesBains");
recherchePunthusLesBains$
    .then(sejour => console.log(`${sejourTrouve}\n-> ${sejour.toString()}\n`))
    .catch(error => console.log(`${ruto}\n${error}\n${troll}`));