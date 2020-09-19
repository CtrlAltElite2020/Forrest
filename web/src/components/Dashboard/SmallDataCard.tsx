import {COLORS, ReducerContext} from '@app/common';
import {Avatar, Box, Card, CardActions, CardContent, Grid, Hidden, Link, Typography} from '@material-ui/core';
import React, {useContext} from 'react';
import {UserContext} from "../../context/context";
import ShowChartIcon from '@material-ui/icons/ShowChart';
import LanguageIcon from '@material-ui/icons/Language';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import LinearProgress from "@material-ui/core/LinearProgress";
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import FilterDramaIcon from '@material-ui/icons/FilterDrama';

interface Props {
    data: number;
    max: number;
    title: string;
    icon: any;
    iconBackground: string;
    unit: string;
    barUnit: string;
}



function LinearProgressWithLabel(props: any) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="90%" mr={1}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                    props.value,
                )} ${props.barUnit}`}</Typography>
            </Box>
        </Box>
    );
}

const SmallDataCard: React.FC<Props> = ({data, max, unit, barUnit, title, icon, iconBackground}) => {
    const {state, dispatch} = useContext<ReducerContext>(UserContext);

    const normalise = ({value}: { value: number }) => (value - 0) * 100 / (max - 0);

    let iconType;
    if (icon == 'nature') {
        iconType = <NaturePeopleIcon/>
    } else if (icon == 'cloud') {
        iconType = <FilterDramaIcon/>
    } else {
        iconType = <ShowChartIcon/>
    }

    // @ts-ignore
    return (
        <Box m={2} style={{'position':"relative", 'minWidth':'290px'}}>
            <Avatar style={{'position':"absolute", "left":-10,"top":-10,"backgroundColor":iconBackground}} variant="square">
                {iconType}
            </Avatar>
            <Card>
                <CardContent>
                    <Typography color="textPrimary" gutterBottom>
                        {title}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        {data} / {max} {unit}
                    </Typography>
                    <LinearProgressWithLabel value={normalise({value: data})} barUnit={barUnit} />
                </CardContent>
            </Card>
        </Box>
    );
};

export default SmallDataCard;