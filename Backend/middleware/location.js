import axios from 'axios';

async function geocodeAddress(address){
    const apiKey = "AAPTxy8BH1VEsoebNVZXo8HurLXOHfTw7xS6Y4MDf0mhJNkT2Mx73me4-Emx56Jk88fkYx5HDtyV1aliO1E0QXLNC5aLZYA418tacd7Ns6y64vW3Mvl9Jmesfl-fIKUQVJGAUo2LALOlhn6GkpBkjcC0Nbl8nkOHh0DyAUjySQMTxXtxkg744q6cUfLIDTPdrNa_nRzvj8HvvPkXw1WfrfTY3lMhgSIbxXzVk-H41rxCyJw.AT1_bV6fTXOy" ;
    const url= `https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates`;

    const res = await axios.get(url,{
        params : {
            f:"json" ,
            singleLine : address,
            outFields:"Match_addr,Addr_type",
            token : apiKey,
        }
    });
    return res.data.candidates[0]?.location ;

}