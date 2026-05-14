import { useListaDeParticipantes } from "./useListaDeParticipantes";
import { useSetRecoilState } from "recoil";
import { resultadoDoAmigoSecreto } from "../atom";
import { realizarSorteio } from "../helpers/realizarSorteio";

export const useSorteador = () => {
  const participantes = useListaDeParticipantes();

  const setResutado = useSetRecoilState(resultadoDoAmigoSecreto);
  return () => {
    const resultado = realizarSorteio(participantes);
    setResutado(resultado);
  };
};
