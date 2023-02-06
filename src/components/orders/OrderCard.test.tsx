import { render, screen } from "@testing-library/react"
import ReactDOM from 'react-dom'
import { OrderCard } from "./OrderCard"

it('renders OrderCard without crashing', ()=>{
    const div = document.createElement('div')
    ReactDOM.render(<OrderCard
        key={1}
        order={{orderId: 1,
            paymentId: 1,
            orderDate: "2023-06-02",
            shipmentAddress: "123 Candy Way"}}
        ></OrderCard>, div)
})