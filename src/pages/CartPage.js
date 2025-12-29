import "./CartPage.scss";
import { useEffect, useState } from "react";
import CartItem from "../components/cart/CartItem";

import {
  cartGet,
  cartCheck,
  checkAll,
  removeChecked,
  cartQty,
  cartOption,
  totalPrice,
  checkedOrder,
} from "../components/cart/cartProduct";

const CartPage = () => {
  // 장바구니 목록 state
  const [cartItem, setCartItem] = useState([]);

  //주문 완료 팝업 표시 state
  const [orderPopup, setOrderPopup] = useState(false);

  //스크롤 후 상단바 상태 state
  const [cartTopFixed, setCartTopFixed] = useState(false);

  //장바구니 페이지 접속 시 현재 장바구니 목록 보여지기
  useEffect(() => {
    setCartItem([...cartGet()]);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      // 숫자는 "타이틀이 충분히 보이다가" 고정되길 원하면 더 키워도 됨
      setCartTopFixed(window.scrollY > 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  //cartProduct.js에서 장바구니 배열이 바뀐 후 장바구니 페이지를 새로 로드하는 함수 : 동기화
  const cartSync = () => {
    setCartItem([...cartGet()]);
  };

  //전체 선택 계산 함수
  const AllChecked =
    cartItem.length > 0 && cartItem.every((item) => item.checked);

  //전체 선택|해제
  const handleCheckedAll = () => {
    checkAll(!AllChecked); //true : 전체선택, false:전체해제
    cartSync();
  };

  //선택 삭제
  const handleRemove = () => {
    removeChecked();
    cartSync();
  };

  //개별 체크
  const handleItemCheck = (cartKey) => {
    cartCheck(cartKey);
    cartSync();
  };

  //수량변경
  const handleQty = (cartKey, nextQty) => {
    cartQty(cartKey, nextQty);
    cartSync();
  };

  //옵션 변경
  const handleOption = (cartKey, nextSize, nextColor) => {
    cartOption(cartKey, nextSize, nextColor);
    cartSync();
  };

  //선택상품 총합
  const cartTotal = totalPrice();

  //주문하기 버튼 클릭 시 동작 함수
  const handleOrder = () => {
    if (cartTotal <= 0) return;

    //체크된 상품 삭제
    checkedOrder();
    cartSync();

    //팝업창 띄우기
    setOrderPopup(true);
    setTimeout(() => setOrderPopup(false), 1000);
  };

  return (
    <div id="cart-page" className={cartTopFixed ? "is-fixed" : ""}>
      {/* ✅ 상단바 (타이틀 포함) */}
      <div className={`cart-top ${cartTopFixed ? "is-fixed" : ""}`}>
        <p className="user-info">비회원</p>

        {/* ✅ 스크롤 전에는 보이고, 스크롤 후에는 숨길 타이틀 */}
        <p className="cart-h1">장바구니</p>

        <div className="right">
          <button type="button" className="cart-all" onClick={handleCheckedAll}>
            {AllChecked ? "전체선택 해제" : "전체선택"}
          </button>

          <button type="button" className="cart-del" onClick={handleRemove}>
            삭제
          </button>
        </div>
      </div>

      {/* ✅ fixed 상단바에 가려지지 않게 여백 */}
      <div className="cart-top-spacer" />

      {cartItem.length === 0 ? (
        <div className="cart-empty">장바구니가 비어있습니다</div>
      ) : (
        <div className="cart-wrap">
          {cartItem.map((item) => (
            <CartItem
              key={item.cartKey}
              item={item}
              onCheck={handleItemCheck}
              onQty={handleQty}
              onOption={handleOption}
            />
          ))}
        </div>
      )}

      {/* ✅ 하단은 고정 X : 스크롤 끝에서만 보이면 됨 */}
      <div className="cart-bottom">
        <p className="cart-total">
          <span className="cart-total-label">총액</span>
          <span className="cart-total-price">
            {cartTotal.toLocaleString()}원
          </span>
        </p>

        <button type="button" className="cart-order" onClick={handleOrder}>
          주문하기
        </button>
      </div>

      {orderPopup && <div className="cart-popup">주문이 완료되었습니다.</div>}
    </div>
  );
};

export default CartPage;
