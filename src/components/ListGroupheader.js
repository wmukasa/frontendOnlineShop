import{React,useState,useEffect} from 'react'
import { CDBListGroup, CDBListGroupItem,CDBBadge,CDBContainer } from "cdbreact";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Button,Form,Col,Row,ListGroup} from 'react-bootstrap'

function ListGroupheader() {

  //   const [category,setSelectedCategory] = useState('')
  //   let history = useHistory()
  //   const categoryClick =(category,e)=>{
  //     e.preventDefault()
  //     // console.log(category,e.target.value);
  //      history.push(`api/products/categoryProducts?category=${category}`)
  //      //history.push( `api/admin/productlist`)

  //  }
  //   const categoryClick2 =()=>{
  //     setSelectedCategory( history.push(`/categoryProducts?category=${category}`));
  //   }
      let history = useHistory()

      const routerHistory = useHistory();

          const handleClickAgain =(category,e)=>{
            //console.log( category);
            if(category){
              history.push(`/categoryProducts/${category}`)
              //history.push({ pathname:'/categoryProducts/',search:'?category='+category})
            }
         }

  return (
    <div >
    <CDBContainer>
             <CDBListGroup >{/*style={{ width: "15rem" }} */}
            <ListGroup onClick={(e) => handleClickAgain('ALL-CATEGORIES',e)}>
                  <CDBListGroupItem  active style={{backgroundColor:"#2E8B57"}}>
                      CATEGORIES
                    </CDBListGroupItem>
              </ListGroup>
              <LinkContainer to={`/categoryBlouse`}>
                  <CDBListGroupItem  hover className="d-flex justify-content-between align-items-center">
                    Blouse<CDBBadge color="">NEW</CDBBadge>
                  </CDBListGroupItem>
              </LinkContainer>

              <LinkContainer to={`/categoryDress`}>
                  <CDBListGroupItem hover>Dresses</CDBListGroupItem>
              </LinkContainer>

              <LinkContainer to={`/categoryThrowOn`}>
                  <CDBListGroupItem  hover> Throw Ons</CDBListGroupItem>
              </LinkContainer>

                <LinkContainer to={`/categoryTshirts`}>
                <CDBListGroupItem  hover>T-Shirts</CDBListGroupItem>
                </LinkContainer>


              <CDBListGroupItem hover>
                Sweaters
              </CDBListGroupItem>


              <CDBListGroupItem href="#" hover>
                Bottoms
              </CDBListGroupItem>
              <CDBListGroupItem href="#" hover>
                Coats
              </CDBListGroupItem>
              <CDBListGroupItem href="#" hover>
                Uniforms
              </CDBListGroupItem>
              <CDBListGroupItem href="#" hover>
                Shoes
              </CDBListGroupItem>



              {/* <ListGroup onClick={(e) => handleClickAgain('Throw-on',e)}>ThrowOn</ListGroup>    */}
            </CDBListGroup>



    </CDBContainer>
    {/* <div><input type="text" onChange={(e)=> routerHistory.push(`/${e.target.value}`)}/>
         <Link type="text" onChange={(e)=> routerHistory.push(`/${e.target.value}`)}>Bottom</Link>
    </div> */}

    </div>
  )
}

export default ListGroupheader