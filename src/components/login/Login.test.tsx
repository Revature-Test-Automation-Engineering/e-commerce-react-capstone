import { render, screen } from "@testing-library/react"
import ReactDOM from 'react-dom'
import Login from "./Login";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

it('renders Login without crashing', ()=>{
    const div = document.createElement('div')
    ReactDOM.render(<Login></Login>, div)
})