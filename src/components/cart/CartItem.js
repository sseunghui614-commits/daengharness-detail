import productsData from "../../assets/data/products.json";

const CartItem = ({
  item,              // cartProduct.js에서 만든 장바구니 item 1개
  onCheck,           // 체크 토글 함수 (cartKey) => void
  onQty,             // 수량 변경 함수 (cartKey, nextQty) => void
  onOption,          // 옵션 변경 함수 (cartKey, nextSize, nextColor) => void
}) => {

  //json에서 size와 color 정보를 가져옴 
  const { size: sizeOptions, color: colorOptions } = productsData;

  //체크 토글 
  const handleCheck = () => {
    if(typeof onCheck === 'function') onCheck(item.cartKey);
  };

  //옵션에서 사이즈 변경
  const handleSizeChage = (e) => {
    if (typeof onOption !== "function") return;
    const nextSize = e.target.value;
    onOption(item.cartKey, nextSize, item.color);
  }
  //옵션에서 색상 변경
  const handleColorChange =(e) => {
    if(typeof onOption !== 'function') return; 
    const nextColor = e.target.value;
    onOption(item.cartKey, item.size, nextColor)
  }

  //수량 변경 
  // -1 : 최소 수량 1개 
  const handleMinus = () => {
    if(typeof onQty !== 'function') return;
    const next = Math.max(1, Number(item.qty) - 1);
    onQty(item.cartKey, next);
  };

  const handlePlus = () => {
    if(typeof onQty !== 'function') return;
    const next = Math.max(1, Number(item.qty) + 1);
    onQty(item.cartKey, next)
  }
  

  return (
    <div className="cart-item">
      {/* 개별 체크박스 */}
      <label className="cart-check">
        <input 
          type="checkbox"
          checked = {!!item.checked}
          onChange={handleCheck} />
      </label>

      <div className="cart-img">
        {/* 이미지 없을 시 영역만 보이도록 처리 */}
        {item.img ? (<img src={item.img} alt={item.productName}/>) : 
          (<div className="img-empty"/>)
        }
      </div>

      {/* 상품 정보 */}
      <div className="cart-info">
        <p className="cart-prod-name">{item.productName}</p>

        {/* 옵션 : Info.js 와 동일하게 selectbox로  */}
        <div className="cart-options">
          {/* 사이즈 옵션 */}
          <select 
            className="cart-size-select"
            value={item.size || ''}
            onChange={handleSizeChage}
          >
            <option value=''>(필수) 옵션을 선택해주세요 (사이즈)</option>
            {sizeOptions.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
            
            {/* 색상 옵션 */}
          <select 
            className="cart-color-select"
            value={item.color || ''}
            onChange={handleColorChange}
          >
            <option value=''>(필수) 옵션을 선택해주세요 (색상)</option>
            {colorOptions.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="cart-bottom-row">
          {/* 할인 적용 안 함: 텍스트만 */}
          <p className="cart-sale-text">
            회원가입 시 {item.salePerc}% 할인
          </p>
          
          {/* 수량 */}
          <div className="cart-qty">
            <button type="button" onClick={handleMinus}>-</button>
            <span>{item.qty}</span>
            <button type="button" onClick={handlePlus}>+</button>
          </div>

          {/* 상품 가격 */}
          <p className="cart-price">
            {Number(item.price).toLocaleString()}원
          </p>
        </div>

      </div>

    </div>
  )
}

export default CartItem