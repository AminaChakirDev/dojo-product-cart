import { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

const initialProductList = [
  { id: 1, name: 'produit 1', price: 50, quantity: 1 },
  { id: 2, name: 'produit 2', price: 75, quantity: 2 },
  { id: 3, name: 'produit 3', price: 20, quantity: 5 },
];

function App() {

  const [products, setProducts] = useState(initialProductList);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState(0);

  const sumProducts = products.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );

  const handleProductQuantityChange = (id, quantity) => {
    if (quantity === 0) {
      if (window.confirm('Etes vous sûr de vouloir supprimer cet item ?')) {
        setProducts(products.filter((product) => product.id !== id));
      }
    } else {
      setProducts(
        products.map((product) =>
          product.id === id ? { ...product, quantity } : product
        )
      );
    }
  };

  const handleNewProductNameChange = (event) => {
    setNewProductName(event.target.value);
  };

  const handleNewProductPriceChange = (event) => {
    setNewProductPrice(event.target.value);
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    setProducts([
      ...products,
      {
        id: uuidv4(),
        name: newProductName,
        price: parseInt(newProductPrice),
        quantity: 1,
      },
    ]);
  };

  return (
    <div className='App'>
      {console.log(products)}
      <h1>Ma commande</h1>
      <table>
        <thead>
            <tr>
              <th>Produits</th>
              <th>Prix unitaire</th>
              <th>Quantité</th>
              <th>Prix total</th>
            </tr>
        </thead>
        <tbody>
          {products.map((product)=> (
            <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
            <input
                    type='number'
                    min='0'
                    value={product.quantity}
                    onChange={(event) =>
                      handleProductQuantityChange(
                        product.id,
                        event.target.value
                      )
                    }
                  />
            </td>
            <td>{product.price * product.quantity}</td>
        </tr>
          )  
          )}
        </tbody>
      </table>
      <p>Montant de la commande : {sumProducts}</p>
      <form onSubmit={handleAddProduct}>
        <h2>Ajouter un produit</h2>
        <div className='field'>
          <label>Nom </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleNewProductNameChange}
            value={newProductName}required/>
        </div>
        <div className='field'>
          <label>Prix </label>
          <input
            type="number"
            name="price"
            min="0"
            id="price"
            value={newProductPrice}
            onChange={handleNewProductPriceChange}/>
        </div>
        <div className='field'>
          <input type="submit" value="Ajouter"/>
        </div>
      </form>
    </div>
  );
}

export default App;
