import { realizarSorteio } from "./realizarSorteio";

describe("Dado um sorteio de amigo secreto", () => {
  test("Cada participante não sorteie o próprio nome", () => {
    const participantes = [
      "ana",
      "catarina",
      "joao",
      "vinicius",
      "natalia",
      "juliana",
    ];

    const sorteio = realizarSorteio(participantes);
    participantes.forEach((participante) => {
      const amigoSecreto = sorteio.get(participante);
      expect(amigoSecreto).not.toEqual(participante);
    });
  });
});
