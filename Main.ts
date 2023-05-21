import { Animal } from "./Animal";
import { AnimalDomestico } from "./AnimalDomestico";
import { AnimalSelvagem } from "./AnimalSelvagem";
import { Util } from "./Util";

const prompt = require('prompt-sync')()

let animais: Animal[] = [];
let um: Animal = new AnimalSelvagem("Macaco", 8, 2, 40, true, 6);
let umm: Animal = new AnimalDomestico("Cachorro", 5, 15, 45, false, 2);
let dois: Animal = new AnimalSelvagem("Leão", 6, 20, 60, false, 10);
let doiss: Animal = new AnimalDomestico("Gato", 2, 5, 30, true, 5);
let tres: Animal = new AnimalSelvagem("Crocodilo", 10, 30, 35, false, 12);
let tress: Animal = new AnimalDomestico("Hamster", 0.5, 40, 5, false, 1);

try {
    menu:
    while (true) {
        console.log("-".repeat(32));
        console.log(`=== Simulador de vida animal ===`);
        console.log("-".repeat(32));  
        console.log("1. Escolher os animais");
        console.log("2. Alimentar");
        console.log("3. Apostar corrida");
        console.log("4. Dormir");
        console.log("5. Marcar Território");
        console.log("6. Brigar");
        console.log("7. Adestrar");
        console.log("8. Migrar");
        console.log("0. Sair");
        console.log("=".repeat(32));

        let option = Number(prompt("Escolha uma ação: "));
        switch (option) {
            case 1:
                while(animais.length < 2) {
                    console.log("ESCOLHA OS ANIMAIS PARA INICIAR A SIMULAÇÃO");
                    console.log("-".repeat(44));  
                    console.log("1. Animal Doméstico");
                    console.log("2. Animal Selvagem");
                    console.log();
                    let option2 = Number(prompt("Escolha um animal para iniciar: "));
                    if (option2 == 1) {
                        let option3 = Number(prompt("Digite 1, 2 ou 3 para sortear o animal doméstico: "));
                        if (option3 == 1) {
                            animais.push(umm);
                        }
                        if (option3 == 2) {
                            animais.push(doiss);
                        }
                        if (option3 == 3) {
                            animais.push(tress);
                        }
                        console.log("Animal doméstico escolhido!");
                        console.log();

                    } else if (option2 == 2) {
                        let option4 = Number(prompt("Digite 1, 2 ou 3 para sortear o animal selvagem: "));
                        if (option4 == 1) {
                            animais.push(um);
                        }
                        if (option4 == 2) {
                            animais.push(dois);
                        }
                        if (option4 == 3) {
                            animais.push(tres);
                        }

                    } else {
                        console.log("Escolha uma opção válida!");
                        console.log();
                        option == 1
                    }
                }
                Util.exibir("Animais escolhidos!", animais[0], animais[1]);
                break;
            case 2:
                const quantidade = Number(prompt("Informe a quantidade de alimento (Kg.): "));
                animais[0].alimentar(quantidade);
                animais[1].alimentar(quantidade);
                Util.exibir("Alimentado (ou não):", animais[0], animais[1]); 
                break;
            case 3:
                console.log();
                console.log(`Corredor 1: ${animais[0].nome}  X  Corredor 2: ${animais[1].nome}`);            
                animais[0].apostarCorrida(animais[1]);
                Util.exibir("Ao final da corrida:", animais[0], animais[1]);
                break;
            case 4:
                animais[0].dormir();
                animais[1].dormir();
                Util.exibir("Depois do soninho:", animais[0], animais[1]);
                break;
            case 5:
                animais[0].marcarTerritorio();
                animais[1].marcarTerritorio();
                Util.exibir("Depois da disputa por território:", animais[0], animais[1]);
                break;
            case 6:               
                if (animais[0].brigar()){
                    console.log(`Hoje o ${animais[0].nome} ganhou a briga.`); 
                } else {
                    console.log(`Hoje não foi dia de o ${animais[0].nome} brigar!`);   
                }
                if (animais[1].brigar()){
                    console.log(`Hoje o ${animais[1].nome} ganhou a briga.`); 
                } else {
                    console.log(`Hoje não foi dia de o ${animais[1].nome} brigar!`);  
                }
                Util.exibir("Depois da briga:", animais[0], animais[1]);
                break;
            case 7:
                if (animais[1] || animais[0] instanceof AnimalSelvagem) {
                    console.log("Não é possível adestrar um animal selvagem!");
                }
                if (animais[0] instanceof AnimalDomestico) {
                    animais[0].adestrar();
                }
                if (animais[1] instanceof AnimalDomestico) {
                    animais[1].adestrar();
                } 
                Util.exibir("Adestrado:", animais[0], animais[1]);
                break;
            case 8:
                let vaiOuNao = Number(prompt("Informe '1' para migrar ou '0' para ficar: "));
                if (animais[0] || animais[1] instanceof AnimalDomestico) {
                    console.log("Um animal doméstico não migra!");
                } 
                if (animais[0] instanceof AnimalSelvagem) {
                    animais[0].migrar(vaiOuNao);
                } 
                if (animais[1] instanceof AnimalSelvagem) {
                    animais[1].migrar(vaiOuNao);
                }
                Util.exibir("Situação atual:", animais[0], animais[1]);
                break;
            default:
                Util.exibir("**Final de simulação!** ", animais[0], animais[1]);
                break menu;
        }
    }    
} catch (e) {
    console.log((e as any).message);
    Util.exibir("**Final de simulação!**", animais[0], animais[1]);    
}

