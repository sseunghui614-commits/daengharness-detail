/*상세페이지에서 넘어온 상품의 정보를 관리하는 js 파일  */
/*장바구니에 들어갈 데이터 저장 및 장바구니 상태를 변경해주는 함수 지정 */


// 장바구니 전체 목록을 담은 배열 타입의 변수 
let cartProductItems = [];

//같은 상품 + 같은 옵션이면 수량 합치는 key 
const cartJoinKey = (productId, size, color ) => {
    return `${productId}-${size || "none"}-${color || "none"}`;
}

//장바구니 목록 가져오기 
export const cartGet = () => {return cartProductItems};

//장바구니 목록 바꾸기 
// 주문 완료 후 장바구니 초기화 상태 지정
export const cartSet = (next) => {
  cartProductItems = Array.isArray(next) ? next : [];
  return cartProductItems;
}

//장바구니에 추가되는 함수 (상세페이지에서 장바구니 버튼 누르면 호출 될 함수 지정)
// 장바구니 버튼 클릭 시 cartAdd 함수 실행 되면서   productId, productName, salePerc... 정보 받기)
export const cartAdd = ({
  productId, productName, salePerc, size, color, qty, price, img 
}) => {
  const key = cartJoinKey(productId, size, color); 

  const found = cartProductItems.find((item) => 
    item.cartKey === key
  );

  if(found) {
    // 같은 상품 + 같은 옵션일 경우 수량 합치기
    cartProductItems = cartProductItems.map((item) => 
      item.cartKey === key ? {...item, qty:item.qty + Number(qty || 1 )} : item
    )
  }else {
    // 아닐경우 새 항목 추가됨 
    cartProductItems = [
      ...cartProductItems, {
        cartKey : key, 
        productId, productName,
        salePerc,
        size,
        color,
        qty : Number(qty || 1), 
        price : Number(price || 0),
        img,
        checked : true  // 장바구니에 들어오면 기본적으로 체크되어짐 
      },
    ];
  }

  return cartProductItems;
};

//개별 아이템 체크 토글 
export const cartCheck = (cartKey) => {
  cartProductItems = cartProductItems.map((item) => 
    item.cartKey === cartKey ? {...item, checked : !item.checked} : item
  );
  return cartProductItems;
};

//전체 선택 | 전체 해제 
export const checkAll = (checkitem) => {
  cartProductItems = cartProductItems.map((item) => ({...item, checked : !!checkitem}));
  return cartProductItems;
}

//선택 삭제 
export const removeChecked = () => {
  cartProductItems = cartProductItems.filter((item) => !item.checked);
  return cartProductItems;
};

// 수량 변경 (최소 1개)
export const cartQty = (cartKey, nextQty) => {
  const isQty = Math.max(1, Number(nextQty || 1));
  cartProductItems = cartProductItems.map((item) =>
    item.cartKey === cartKey ? { ...item, qty : isQty} : item
  );
  return cartProductItems;
}

//옵션 변경 처리 
// 옵션 변경 시 cartItem의 key 가 변경 -> 충돌(같은상품,옵션) 처리 완료 
export const cartOption = (cartKey, nextSize, nextColor) => {
  const target = cartProductItems.find((item) => item.cartKey === cartKey);
  if (!target) return cartProductItems;

  const newCartKey = cartJoinKey(target.productId, nextSize, nextColor);

  // 옵션 변경되고나서 기존 항목 제거
  const rest = cartProductItems.filter((item) => item.cartKey !== cartKey);

  // 변경된 옵션(newCartKey)가 이미 있으면 수량 올리기
  const exist = rest.find((item) => item.cartKey === newCartKey);

  if(exist) {
    cartProductItems = rest.map((item) => 
    item.cartKey === newCartKey ? {
      ...item, 
      qty : item.qty + target.qty,
      checked : item.checked || target.checked
    } : item );
  }else {
    //없으면 새 key 생성 
    cartProductItems = [
      ...rest, {
        ...target,
        cartKey : newCartKey,
        size : nextSize,
        color : nextColor
      },
    ];
  }
  return cartProductItems;
}

//선택된 상품들 기준으로 총합 계산하기
export const totalPrice = () => {
  return cartProductItems
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.price * item.qty, 0);
};

//주문 완료 (체크된 상품 제거) : 주문하기 버튼 클릭 시 실행될 함수 
export const checkedOrder = () => {
  cartProductItems = cartProductItems.filter((item) => !item.checked);
  return cartProductItems;
};