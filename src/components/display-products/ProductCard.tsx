import {
    SearchOutlined,
    ShoppingCartOutlined,
  } from "@material-ui/icons";
import { useContext } from "react";
  import styled from "styled-components" ;
import { CartContext } from "../../context/cart.context";
import Product from "../../models/Product";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import * as React from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { Badge } from "@material-ui/core";

  
  const Info = styled.div`
    opacity: 0;
    width: 100%;s
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
  `;
  
  const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    &:hover ${Info}{
      opacity: 1;
    }
  `;
  
  const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
  `;
  
  const Image = styled.img`
    height: 75%;
    z-index: 2;
  `;

  const DialogImage = styled.img`
    display: block;
    width: 75%;
    height: 75%;
    margin: auto;
    z-index: 2;
  `;
  
  const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
  `;

  const DialogContentStyle = {
    DialogContent:{
      padding: "50px"
    },
}
  
  interface productProps {
      product: Product,
      key: number
  }

  const BootstrapDialog = muiStyled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
  }
  
  const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  export default function ProductDetailDialogs(props: productProps) {
    const [open, setOpen] = React.useState(false);
    const { cart, setCart } = useContext(CartContext);
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    const changeQuantity = (product: Product) => {

      const newCart = [...cart]
      const index = newCart.findIndex((searchProduct) => {
        return searchProduct.id === product.id
      })
  
      if (index === -1 && product.quantity === 1) {
        
        newCart.push(product)

      }
    
      
      else if (product.quantity === 1 || (product.quantity === -1 && newCart[index].quantity >=1)) newCart[index].quantity+=product.quantity;
      
      setCart(newCart)
      
      if (newCart[index].quantity <= 0) removeProduct(product)
    }

    const cartTotal = () => {
      let total = 0;
      for (let i = 0; i < cart.length; i++) {
        total += cart[i].quantity;
      }
      return total;
    }

    const showProductQuantity = (product: Product) => {
      const index = cart.findIndex((searchProduct) => {
        return searchProduct.id === product.id
      })
      if (index === -1) return (0)      
      console.log(index)
      console.log(cart)
      return cart[index].quantity
    }
  

    const removeProduct = (product: Product) => {

      const newCart = [...cart]
      const index = newCart.findIndex((searchProduct) => {
        return searchProduct.id === product.id
      })
  
      for (let i = 0; i < newCart.length; i++) {
        if (i === index) newCart.splice(i, 1);
      }
  
      setCart(newCart)
    }
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Icon aria-label="view-product-details" onClick={handleClickOpen}>
          <SearchOutlined />
        </Icon>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            {props.product.name}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <DialogImage src={props.product.image}/>
          </DialogContent>
          <DialogContent dividers>
          <Typography gutterBottom>
            Price: {formatter.format(props.product.price)}
          </Typography>
          </DialogContent>
          <DialogContent dividers>
            <Typography gutterBottom>
              {props.product.description}
            </Typography>
          </DialogContent>
          <DialogActions>
            {/* <Button autoFocus onClick={handleClose}>
              Here we need to implement add to cart
            </Button> */}
            <IconButton onClick={() => {changeQuantity({...props.product, quantity: 1})}}>
              <AddIcon/>
            </IconButton>
            <Typography>
              {showProductQuantity(props.product)}
            </Typography>
            <IconButton onClick={() => {changeQuantity({...props.product, quantity: -1})}}>
              <RemoveIcon/>
            </IconButton>
            <IconButton onClick={() => {removeProduct(props.product)}}>
              <DeleteIcon/>
            </IconButton>
          </DialogActions>
        </BootstrapDialog>
      </div>
    );
    }

  export const ProductCard = (props: productProps) => {
    const { cart, setCart } = useContext(CartContext);
    

    const addItemToCart = (product: Product) => {

      const newCart = [...cart]
      const index = newCart.findIndex((searchProduct) => {
        return searchProduct.id === product.id
      })

      if (index === -1) newCart.push(product)
      else newCart[index].quantity += product.quantity

      setCart(newCart)
    }

    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const showProductQuantity = (product: Product) => {
      const index = cart.findIndex((searchProduct) => {
        return searchProduct.id === product.id
      })
      if (index === -1) return (0)      
      console.log(index)
      console.log(cart)
      return cart[index].quantity
    }
  
    return (
      <Container>
        <Circle />
        <Image src={props.product.image} />
        <Info>
          <Icon>
            <Badge badgeContent={showProductQuantity(props.product)} color="primary">
             <ShoppingCartOutlined onClick={() => {addItemToCart({...props.product, quantity: 1})}} />
            </Badge>         
          </Icon>
          <ProductDetailDialogs product={props.product} key={props.product.id}></ProductDetailDialogs>
        </Info>
      </Container>

    );
  };