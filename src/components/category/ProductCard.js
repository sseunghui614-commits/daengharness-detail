import { useState } from "react";
import likeOn from "../../assets/images/banner/Banner01.png";
import likeOff from "../../assets/images/banner/Banner02.png";
import { useNavigate } from "react-router-dom";
import like from "../../assets/images/Grid/like.svg";


const ProductCard = ({item}) => {
    const [isHover,setIsHover] =useState(false);
    const navigate = useNavigate();
    const CategorySelect = (CategoryName)=>{
        let harnessid;
        switch(CategoryName){
            case "H": harnessid="1"; break; 
            case "L": harnessid="21"; break; 
            case "C": harnessid="31"; break; 
            case "Y": harnessid="11"; break; 
        }
        return navigate(`/product/`+harnessid)
        };
    const getImagePath = (imgName)=>{
        let hoverName = imgName;
        if(item.best){
            if( isHover ){
            hoverName = item.img2;
            }
        }
        return require(`../../assets${hoverName}`);
    }
    return (
        <div className="category-prodtag">
            <div className="card-top"
            onMouseEnter={()=>{setIsHover(true)}}
            onMouseLeave={()=>{setIsHover(false)}}>
                {/* <img src={getImagePath(item.img1)} 
                onClick={()=>{navigate(`/product/${item.id}`)}}/> */}
                <img src={getImagePath(item.img1)} 
                onClick={()=>{CategorySelect(item.type)}}/>
                {
                    item.best ? '' : <img className="soldout-img"
                    src={require(`../../assets/images/Grid/Soldout.png`)}
                    onClick={()=>{alert('품절된 상품입니다.')}}/>
                }
                
            </div>
            <div className="card-bottom">
                <div className="bottom-all">
                <p>{item.prod_name}</p>
                <p>￦{Number(item.origin_price).toLocaleString()}</p>
                </div>
                <img src={like} 
                onClick={()=>{alert('로그인후 이용 가능합니다.')}}/>
            </div>
        </div>
    )
}

export default ProductCard
