import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Card, Button } from 'react-bootstrap';
import './Home.css';




class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      fruitsArray: []
    }
  }
  componentDidMount = () => {
    const { isAuthenticated } = this.props.auth0;
    if (isAuthenticated) {
      axios.get(`${process.env.REACT_APP_URL}/fruits`)
        .then(result => {
          this.setState({
            fruitsArray: result.data.fruits
          })
        })
    }
  }
  addtofav = (idx) => {
    let email = this.props.auth0.user.email;
    let { name, image, price } = this.state.fruitsArray[idx]
    let data = {
      name: name,
      image: image,
      price: price
    }
    console.log(data)
    axios.post(`${process.env.REACT_APP_URL}/favlist/${email}`, data)
      .then(result => {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your fruit has been added',
          showConfirmButton: false,
          timer: 1500
        })
        this.componentDidMount();
        this.forceUpdate();
      })
  }
  render() {
    return (
      <>
        <div>
          {this.state.fruitsArray.map((item, idx) => {
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
                        <Button variant="primary" onClick={()=>this.addtofav(idx)}>favorite ❤️️</Button>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>



            )
          })}

        </div>


      </>
    )


  }
}

export default withAuth0(Home);
