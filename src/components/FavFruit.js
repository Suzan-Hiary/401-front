import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card , Button} from 'react-bootstrap'
import Modalform from './Modalform';
import Swal from 'sweetalert2'
import './Home.css' ;


class FavFruit extends React.Component {
  constructor() {
    super()
    this.state = {
      fruitsArray: [] ,
      id :0 ,
      item : [],
      isShow : false
    }
  }
  componentDidMount = async() => {
    
   let email = this.props.auth0.user.email ;

    
     await axios
      .get(`${process.env.REACT_APP_URL}/favlist/${email}`)
        .then(result => {
          this.setState({
            fruitsArray: result.data.fruits
          })
        })
    
  }
 deletefav=(idx)=>{
   let email = this.props.auth0.user.email ;
   let id = idx
 
   
   axios.delete(`${process.env.REACT_APP_URL}/delete/${email}/${id}`)
   .then(result=>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your fruit has been deleted',
      showConfirmButton: false,
      timer: 1500
    })
     this.componentDidMount();
     this.forceUpdate();
   })
 }


showmodal=(idx)=>{
  this.setState({
    item : this.state.fruitsArray[idx] ,
    isShow : true ,
    id : idx
  })
}

closehandle=()=>{
  this.setState({
    isShow : false
  })
}

updatehandle=(e)=>{
  e.preventDefault() ;
  let id = this.state.id
  let data={
    name : e.target.name.value ,
    image :e.target.image.value  ,
    price :e.target.price.value 
  }

  axios.put(`${process.env.REACT_APP_URL}/update/${id}` , data)
  .then(result=>{
    this.setState({
      fruitsArray : result.data.fruits
    })
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your fruit has been updated',
      showConfirmButton: false,
      timer: 1500
    })
    this.componentDidMount();
  this.forceUpdate()
  })
  
}

  render() {
    return (
      <>
        
        <div>
        {this.state.fruitsArray.length>0 && this.state.fruitsArray.map((item, idx) => {
          return (
            <div class="float-container">

              <div class="float-child">
                <div class="green">

                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                        price :{item.price}
                      </Card.Text>
                      <Button variant="danger" onClick={()=>this.deletefav(idx)}>delete</Button>
                      <Button variant="outline-success" onClick={()=>this.showmodal(idx) } style={{margin: '20px'}}>Update</Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          )
        })}
        </div>

        <div>
          {this.state.isShow && 
          <Modalform 
        show={this.state.isShow}
      hide={this.closehandle}
    item={this.state.item}
  update={this.updatehandle}
/>}
        </div>
      </>
    )
  }
}

export default withAuth0( FavFruit) ; 
