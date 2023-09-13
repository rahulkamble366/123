import React, { Component } from "react";
import {
  Card,
  Button,
  Header,
  Image,
  List,
  ListItem,
  TextField,
  GoogleMap,
  Marker,
} from "react-bootstrap";

class ProfileDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      map: null,
    };
  }

  componentDidMount() {
    // Get the profiles data from an API or database.
    fetch("/api/profiles")
      .then((response) => response.json())
      .then((profiles) => {
        this.setState({ profiles });
      });

    // Initialize the map.
    this.map = new GoogleMap({
      center: { lat: 0, lng: 0 },
      zoom: 2,
    });
  }

  render() {
    const { profiles, map } = this.state;
    return (
      <div>
        <Header>
          <h1>Profiles</h1>
        </Header>
        <List>
          {profiles.map((profile) => (
            <ListItem key={profile.id}>
              <Card>
                <Card.Body>
                  <Image src={profile.photo} alt={profile.name} />
                  <h2>{profile.name}</h2>
                  <p>{profile.description}</p>
                </Card.Body>
                <Button
                  onClick={() => {
                    this.map.setCenter({ lat: profile.latitude, lng: profile.longitude });
                    this.map.addMarker({
                      position: { lat: profile.latitude, lng: profile.longitude },
                      title: profile.name,
                      content: profile.description,
                    });
                  }}
                >
                  View on Map
                </Button>
              </Card>
            </ListItem>
          ))}
        </List>
        <GoogleMap ref={map} />
      </div>
    );
  }
}

export default ProfileDisplay;
