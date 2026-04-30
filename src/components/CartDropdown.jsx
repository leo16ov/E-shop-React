import { IconClose, IconPlus, IconMinus } from "./icons";

export default function CartDropdown({ cart, onUpdateQty, onClose }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div className="cart-dropdown">
      <div className="cart-drop-header">
        <span className="cart-drop-title">Mi Carrito</span>
        <button className="btn-icon-plain" onClick={onClose}><IconClose /></button>
      </div>
      {cart.length === 0 ? (
        <p className="cart-empty">Tu carrito está vacío</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-drop-item">
                <img src={item.image1} alt={item.name} className="cart-thumb" />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">${(item.price * item.qty).toFixed(2)}</p>
                </div>
                <div className="qty-ctrl">
                  <button className="qty-btn" onClick={() => onUpdateQty(item.id, -1)}><IconMinus /></button>
                  <span className="qty-num">{item.qty}</span>
                  <button className="qty-btn" onClick={() => onUpdateQty(item.id, 1)}><IconPlus /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-drop-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span className="subtotal-price">${subtotal.toFixed(2)}</span>
            </div>
            <button className="btn-checkout">Ir al pago →</button>
          </div>
        </>
      )}
    </div>
  );
}