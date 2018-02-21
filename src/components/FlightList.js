import React, { Component } from "react";

import { List } from "material-ui/List";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

import { getFormattedDateTimeFromUnixTimestamp } from "../services/Utils";

export default class FlightList extends Component {
  render() {
    const getCardTitle = connection =>
      `${connection.cityFrom} (${connection.flyFrom}) → ${connection.cityTo} (${
        connection.flyTo
      })`;

    const getCardSubtitle = connection =>
      `${getFormattedDateTimeFromUnixTimestamp(
        connection.dTime
      )} - ${getFormattedDateTimeFromUnixTimestamp(connection.aTime)}`;

    const getConnectionPrice = connection =>
      `${connection.price} ${
        this.props.flightData.currency === "EUR"
          ? "€"
          : this.props.flightData.currency
      }`;

    const getFlightConnectionsDescription = connection => {
      if (connection.pnr_count === 1) {
        return `Direct flight duration is ${connection.fly_duration}.`;
      }
      return `Connection is ${connection.fly_duration} long and served by ${
        connection.pnr_count
      } flights.`;
    };

    const getBookingUrl = connection =>
      `https://www.kiwi.com/booking?token=${connection.booking_token}`;

    let cards = null;

    // Populated results
    if (this.props.flightData && this.props.flightData.data.length > 0) {
      cards = this.props.flightData.data.map(connection => (
        <Card key={connection.id}>
          <CardHeader
            title={getCardTitle(connection)}
            subtitle={getCardSubtitle(connection)}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            {getFlightConnectionsDescription(connection)}
          </CardText>
          <CardActions>
            <FlatButton
              label={`Book for ${getConnectionPrice(connection)}`}
              href={getBookingUrl(connection)}
            />
          </CardActions>
        </Card>
      ));
    } else {
      // Empty results
      cards = (
        <Card>
          <CardText>No results found.</CardText>
        </Card>
      );
    }

    return <div>{this.props.flightData && <List>{cards}</List>}</div>;
  }
}
