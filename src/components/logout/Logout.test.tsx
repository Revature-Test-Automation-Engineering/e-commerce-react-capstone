import { render, screen } from "@testing-library/react"
import ReactDOM from 'react-dom'
import Logout from "./logout";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

it('renders Logout without crashing', ()=>{
    const div = document.createElement('div')
    ReactDOM.render(<Logout />, div)
})