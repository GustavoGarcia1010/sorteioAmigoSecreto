import { fireEvent, render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes"
import { useResultadoSorteio } from "../state/hook/useResultadodoSorteio"
import Sorteio from "./Sorteio"


jest.mock('../state/hook/useListaDeParticipantes')
jest.mock('../state/hook/useResultadodoSorteio')

describe("A página de sorteio", () => {

  const participantes = ['Ana', 'Gustavo', 'Jorel']

  const resultado = new Map([
    ['Ana', 'Gustavo'],
    ['Gustavo', 'Jorel'],
    ['Jorel', 'Ana']
  ])

  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
    (useResultadoSorteio as jest.Mock).mockReturnValue(resultado)
  })

  test("Todos os participantes podem exibir o seu amigo secreto.", () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    )

    const opcoes = screen.getAllByRole("option")


    expect(opcoes).toHaveLength(participantes.length + 1)
  })

  test("O amigo secreto é exibido quando solicitado", () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    )

    const select = screen.getByRole("combobox")

    fireEvent.change(select, {
      target: { value: 'Ana' }
    })

    const botao = screen.getByRole("button")
    fireEvent.click(botao)

    const amigoSecreto = screen.getByRole("alert")

    expect(amigoSecreto).toBeInTheDocument()
    expect(amigoSecreto).toHaveTextContent('Gustavo')
  })
})