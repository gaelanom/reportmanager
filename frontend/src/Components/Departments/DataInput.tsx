import React from 'react';
import {useState} from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

enum RecordType {
    written,
    MCQ,
}

type Props = {
    id: number;
    type: RecordType;
};

type EntryState = {
    id: number;
    question: string;
    answer: string;
    type: RecordType;
};

class RecordEntry extends React.Component<Props, EntryState> {
    state: EntryState;

    constructor(props: Props) {
        super(props);
        this.state = {
            id: props.id,
            question: "",
            answer: "",
            type: props.type,
        };
    }

    render() {
        return (
            <div>
                <ListItem alignItems="flex-start">
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <TextField fullWidth id="field" label="Field" variant="outlined"/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth id="value" label="Value" variant="outlined"/>
                        </Grid>
                    </Grid>
                </ListItem>
                <Divider component="li"/>
            </div>
        );
    }
}

function DataInput() {
    return (
        <div className="DataInput">
            <h1>Department Data Input</h1>
            <List>

            </List>
        </div>
    )
}

export default DataInput;