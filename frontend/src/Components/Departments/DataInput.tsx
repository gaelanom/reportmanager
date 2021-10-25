import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {newReport, addEmptyQuestion, updateQuestion, getReportByDeptName} from '../../API/reports';

enum RecordType {
    written = "Written",
    MCQ = "Multiple Choice",
}

type Props = {
    id: number;
    type: RecordType;
    question: string;
    answer: string;
};

type EntryState = {
    id: number;
    question: string;
    answer: string;
    type: RecordType;
};

type RecordState = {
    id: number;
    entryList: RecordEntry[];
};

class RecordEntry extends React.Component<Props, EntryState> {
    state: EntryState;

    constructor(props: Props) {
        super(props);
        this.state = {
            id: props.id,
            question: props.question,
            answer: props.answer,
            type: props.type,
        };
    }

    update() {
        updateQuestion(this.state.id, this.state.question, this.state.answer)
    }

    setQuestionAnswer(question: string, answer: string) {
        this.setState({question: question, answer: answer});
    }

    changeType(event: SelectChangeEvent) {
        switch (event.target.value) {
            case RecordType.MCQ:
                this.setState({type: RecordType.MCQ});
                break;
            case RecordType.written:
                this.setState({type: RecordType.written});
                break;
        }
    }

    render() {
        return (
            <div>
                <ListItem alignItems="flex-start">
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <InputLabel id="question-type-select-label">Type</InputLabel>
                                <Select
                                    labelId="question-type-select-label"
                                    id="question-type"
                                    value={this.state.type}
                                    label="Age"
                                    onChange={this.changeType}
                                >
                                    <MenuItem value={RecordType.written}>Written</MenuItem>
                                    <MenuItem value={RecordType.MCQ}>Multiple Choice</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField fullWidth id="field" label="Field" variant="outlined"
                                       defaultValue={this.state.question} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                           this.setState({question: event.target.value});
                                           this.update();
                            }}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth id="value" label="Value" variant="outlined"
                                       defaultValue={this.state.answer} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                           this.setState({question: event.target.value});
                                           this.update();
                            }}/>
                        </Grid>
                    </Grid>
                </ListItem>
                <Divider component="li" variant='middle'/>
            </div>
        );
    }
}

class DataInput extends React.Component<any, any> {
    state: RecordState = {
        entryList: [],
        id: 0
    }

    constructor(props: {department: string}) {
        super(props)
        newReport(props.department)
        getReportByDeptName(props.department).then((r: any) => {
            let questionList: any[] = r.questions;
            let entryList: any[] = [];
            questionList.forEach(e => {
                entryList = [...entryList, this.existEntry(e.id, e.question, e.answer)]
            })
            this.setState({id: r.id, entryList: entryList});
        })
    }

    newEntry(id: number) {
        return <RecordEntry id={id} type={RecordType.written} question={""} answer={""}/>
    }

    existEntry(id: number, question: string, answer: string) {
        return <RecordEntry id={id} type={RecordType.written} question={question} answer={answer}/>
    }

    createNewEntry() {
        addEmptyQuestion(this.state.id).then((r: any) => {
            let entry: any = this.newEntry(r.id)
            this.setState({entryList: [...this.state.entryList, entry]})
        })
    }

    render() {
        return (
            <div className="DataInput">
                <h1 style={{marginLeft: "1em", marginRight: "1em"}}>{ this.props.department } Department Data Input</h1>
                <List style={{marginLeft: "1em", marginRight: "1em"}}>
                    {this.state.entryList}
                    <ListItem>
                        <Button variant="contained" size="large" startIcon={<AddIcon fontSize="large"/>} onClick={() => {
                            this.createNewEntry();
                        }}>Add</Button>
                    </ListItem>
                </List>
            </div>
        )
    }
}

export default DataInput;
