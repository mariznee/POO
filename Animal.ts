import { AnimalChecar } from "./AnimalChecar";
import { AnimalDAO } from "./AnimalDAO";

export abstract class Animal implements AnimalDAO, AnimalChecar {
    protected _nome: string;
    protected _peso: number;
    protected _energia: number;
    protected _idadeMeses: number;
    protected _velocidade: number;
    protected _areaDominio: number;

    constructor(nome: string, peso: number, energia: number, velocidade: number) {
        this._nome = nome;
        this._peso = peso;
        this._energia = energia;
        this._velocidade = velocidade;
        this._idadeMeses = 0;        
        this._areaDominio = 0;
    }

    public get nome(): string {
        return this._nome;
    }
    public get peso(): number {
        return Number(this._peso.toFixed(1));
    }
    public set peso(peso: number) {
        this._peso = Number(peso.toFixed(1));
    }
  
    public abstract alimentar(alimento: number): void
    public abstract apostarCorrida(animal: Animal): void;
    public abstract correr(animal: Animal): void ;
    public abstract brigar(): boolean; 
    dormir(): void {};
    marcarTerritorio(): void {};
    checarPeso(): void {};
    checarDisposicao(): void {};
}
