import { Animal } from "./Animal";
import { Util } from "./Util";

export class AnimalDomestico extends Animal {
    private _pedigree: boolean;
    private _brabeza: number;

    constructor(nome: string, peso: number, energia: number, velocidade: number, pedigree: boolean, brabeza: number) {
        super(nome, peso, energia, velocidade);
        this._pedigree = pedigree;
        this._idadeMeses = 0;
        this._areaDominio = Util.gerarAleatorio(0, 5) + 1;
        this._brabeza = brabeza;
    }

    private checarBrabeza(): void {
        if (this._brabeza <= 0) {
            this._brabeza = 0;
        }
        if (this._brabeza >= 100) {
            this._brabeza = 100;
            throw new Error("R.I.P.\n" +
                `O ${this.nome} morreu de raiva!`);
        }
    }

    public checarDisposicao(): void {
        if (this._energia <= 0) {
            this._energia = 0;
            throw new Error("R.I.P.\n" +
                `Acabou a energia vital do ${this.nome}`);
        }
        if (this._energia > 100) {
            this._energia = 100;
        }
    }

    public checarPeso(): void {
        if (this.peso <= 0) {
            this.peso = 0;
            throw new Error("RIP!\n" +
                `O ${this.nome} morreu de fome!`);   
        }

        if (this.peso >= 100) {  
            this.peso = 100;
            throw new Error("RIP!\n" +
                `O ${this.nome} explodiu de tanto comer!`);
        }
    }

    private checarGeral(): void {
        this.checarBrabeza();
        this.checarDisposicao();
        this.checarPeso();
    }

    public alimentar(racao: number): void {
        if (racao > 0.8) {
            this.peso += Util.gerarAleatorio(1, 3) * racao;
            this._energia += Util.gerarAleatorio(1, 3);
        } else {
            this.peso += Util.gerarAleatorio(1, 2) * racao;
            this._energia += Util.gerarAleatorio(1, 6);
        }
        this._idadeMeses += Util.gerarAleatorio(1, 3);
        this.checarGeral();
    }
    
    public apostarCorrida(corredor: Animal): void {
        this.correr(corredor);
        corredor.correr(this);
    }

    public correr(corredor: Animal): void {
        console.log("*".repeat(this._velocidade), this.nome);
        if (this._pedigree) {
            this.peso -= Util.gerarAleatorio(1, 2);
            this._brabeza -= Util.gerarAleatorio(0, 5);
            this._energia -= Util.gerarAleatorio(1, 3);
            this._idadeMeses += Util.gerarAleatorio(1, 4);
        } else {
            this.peso -= Util.gerarAleatorio(1, 2);
            this._brabeza -= Util.gerarAleatorio(0, 2);
            this._energia -= Util.gerarAleatorio(1, 3);
            this._idadeMeses += Util.gerarAleatorio(1, 2);
        }
        this.checarGeral();
    }

    public dormir(): void {
        this._energia += Util.gerarAleatorio(0, 7);
        this._idadeMeses += Util.gerarAleatorio(1, 3);
        this.checarGeral();
    }

    public marcarTerritorio(): void {
        const aleatorio = Util.gerarAleatorio(0, 3);
        const ganhouTerritorio = aleatorio < this._velocidade && aleatorio < this._energia;

        if (ganhouTerritorio) {
            this._energia -= Util.gerarAleatorio(0, 5);
            this.peso -= Util.gerarAleatorio(1, 2);
            this._velocidade += Util.gerarAleatorio(1, 6);
            this._idadeMeses += Util.gerarAleatorio(1, 4);
            this._areaDominio += Util.gerarAleatorio(0, 1);
            this.checarGeral();
            console.log(`O ${this.nome} garantiu o território e ganhou petisco!`);
            this.alimentar(0.125);
        } else {
            this._energia -= Util.gerarAleatorio(0, 5);
            this._idadeMeses += Util.gerarAleatorio(1, 3);
            console.log(`Melhor o ${this.nome} dormir.`);
            this.dormir();
        }
    }    

    public brigar(): boolean {    
        const maiorLatido = this.latir();
        if (maiorLatido) {
            console.log("Briga ganha agora é só descansar!");
            this.dormir();
        } 
        return maiorLatido;
    }

    private latir(): boolean {
        if (this._pedigree) {
            const aleatorio = Util.gerarAleatorio(0, 7);
            const ganhouBriga = aleatorio < this._velocidade && aleatorio < this._brabeza;
            if (ganhouBriga) {
                this._energia -= Util.gerarAleatorio(0, 4);
                this._brabeza += Util.gerarAleatorio(0, 3);
                this._idadeMeses += Util.gerarAleatorio(0, 6);
                this.checarGeral();
                return true;
            } else {
                this._energia = 2;
                this._brabeza = 60;
                this._idadeMeses += Util.gerarAleatorio(1, 3);
                this.checarGeral();
                console.log(`${this.nome} com pedigree não sabe brigar!`);
                return false;
            }
        } else {
            const aleatorio = Util.gerarAleatorio(0, 3);
            const ganhouBriga = aleatorio < this._velocidade && aleatorio < this._brabeza;
            if (ganhouBriga) {
                this._energia += this._energia * 1.7;
                this._brabeza -= this._brabeza * 0.5;
                this._idadeMeses += Util.gerarAleatorio(1, 6);
                this.checarGeral();
                return true;
            } else {
                this._energia = 5;
                this._idadeMeses += Util.gerarAleatorio(1, 3);
                this.checarGeral();
                return false;
            }    
        }        
    }

    public adestrar(): void {
        if (this._pedigree) {
            this._energia -= Util.gerarAleatorio(0, 3);
            this._brabeza -= Util.gerarAleatorio(0, 3);
            this._velocidade += Util.gerarAleatorio(2, 4);
            this._idadeMeses += Util.gerarAleatorio(1, 3);
        } else {
            this._energia -= Util.gerarAleatorio(0, 3);
            this._brabeza -= Util.gerarAleatorio(2, 6);
            this._velocidade += Util.gerarAleatorio(2, 7);
            this._idadeMeses += Util.gerarAleatorio(1, 5);
        }
        this.checarGeral();
    }  
}
