import React, { useState, useEffect } from 'react';

import { Button, Header, Form, Modal, Input, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';


function HelpModal() {
    const [open, setOpen] = useState(true);

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button size="small" basic color='standard' floated="left">Help <Icon style={{margin: '0px', padding: '0px'}} name="lightbulb outline"/></Button>}
        >
        <Modal.Header>Welcome!</Modal.Header>
        <Modal.Content>
            <span style={{lineHeight: '1.8', fontSize: '15px'}}>
                To support people <b>who wants to stay healthy but fails to do so</b>,<br/>
                this site displays your <u>weekly health information in three aspects</u> (physical, mental, and social health).<br/>
                Your health information is calculated <u>in comparison to others</u>, so that you can understand and improve your health. <br/>
                In addition, you can customize the activities you want to include in calculating your information through the <b>Edit Mode</b>.
                <br/><br/> 

                The website composes of three tabs -- the <b>Overview</b>, the <b>Trend</b>, and the <b>Activity Management</b> tabs --
                where each tab composes of different visualizations. <br/>
            </span>
            <h4><ChangeHistoryIcon style={{marginRight: '2px'}}/> OVERVIEW</h4>
            <span style={{lineHeight: '1.8', fontSize: '15px'}}>
                In the Overview tab, an overview of your health in comparison to others is displayed in the form of triangle graph. <br/>
                Clicking on each health aspect will show a detailed information on each data point used in the calculation.
            </span>
            <h4><TrendingUpIcon style={{marginRight: '2px'}}/> TREND</h4>
            <span style={{lineHeight: '1.8', fontSize: '15px'}}>
                In the Trend tab, how your health changes over the week is shown with line chart. <br/>
                The aggregated chart on the top shows your health status in comparison to other people, and on the bottom small multiples are used to display change in actual data throughout the week.
            </span>
            <h4><LocalActivityIcon style={{marginRight: '2px'}}/> ACTIVITY MANAGEMENT</h4>
            <span style={{lineHeight: '1.8', fontSize: '15px'}}>
                In this tab, we show specific activities that you are doing better/worse than other people through a bubble chart. <br/>
                You can customize the number of bubbles to show based on their sizes.
            </span>
        </Modal.Content>
        <Modal.Actions>
            <Button color='standard' floated='center' onClick={() => setOpen(false)}>
            Begin exploration!
            </Button>
        </Modal.Actions>
        </Modal>
    );
}

export default HelpModal;
