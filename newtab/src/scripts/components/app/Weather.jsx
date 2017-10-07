import React from 'react';
import axios from 'axios';

class Weather extends React.Component {

    constructor() {
        super();
        this.state = {
            data: {},
            latitude: 0,
            longitude: 0,
            flag:false
        }
    }

    componentWillMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude })
            })
        }
    }

    componentDidMount(){
        let url='http://api.openweathermap.org/data/2.5/weather?lat='+this.state.latitude+'&lon='+this.state.longitude+'&units=metric&appid=007875126b6e4d6a119a259410761afb';
        axios.get(url)
        .then(({data})=>{
            this.setState({data:data,flag:true})
        })
        .catch((err)=>{
            console.log("Oops..Something went wrong",err);
        })
    
    }

    render() {
        console.log(this.state.data)
        return (
            this.state.flag?<h1>{this.state.data["weather"][0]["main"]}</h1>:<h1>Loading...</h1>

        );
    }
}

export default Weather;