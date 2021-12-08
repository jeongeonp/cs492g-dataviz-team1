import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { blue } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Icon } from 'semantic-ui-react'

/*
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
*/
export default function BasicCard(props) {
    const health = props.health;
    const percent = props.percent;
    const metric = props.metric.filter(word => word !== 'Overall').toString();
    // const metric = props.metric.toString();

    var icon = <Icon  style={{ margin: 0}} name='heart' />
    if (health === "Physical") {
        icon = <Icon style={{ margin: 0}} name='bicycle' />
    }
    else if (health === 'Social') {
        icon = <Icon  style={{ margin: 0}} name='user' />
    }

    return (
        <Card style={{ marginTop: '0.5em', marginBottom: '0.5em'}} sx={{ minWidth: 250 }} variant="outlined">
            <CardContent>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ flexShrink: 1, paddingRight: '1em' }}>
                        <Avatar sx={{ bgcolor: blue[500] }}>
                            { icon }
                            {/* <Icon name='heart' /> */}
                        </Avatar>
                    </Box>
                    <Box sx={{ flexShrink: 3 }}>
                        <Typography sx={{ fontSize: 14, margin: 0 }} gutterBottom>
                            { health }
                        </Typography>
                        <Typography variant="h5" component="div">
                            <span style={{color: '#333'}}><b style={{fontSize: '110%'}}>{ percent }</b>th percentile</span>
                        </Typography>
                        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                        </Typography> */}
                        <Typography variant="body2" color="text.secondary">
                            { metric.replaceAll(',', ', ') }
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    );
}