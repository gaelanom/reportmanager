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
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {newReport, addEmptyQuestion, addQuestion, addMultipleChoiceQuestion, updateQuestion, getReportByDeptName} from '../../API/reports';

enum RecordType {
    written = "Written",
    MCQ = "Multiple Choice",
}

type Props = {
    id: number;
    type: RecordType;
    question: string;
    answer: string;
    options: Map<string, string>;
    choice: string;
};

type EntryState = {
    id: number;
    question: string;
    answer: string;
    type: RecordType;
    entryField: any[];
    options: string[];
    choice: string;
    isEdit: boolean;
};

type RecordState = {
    id: number;
    entryList: RecordEntry[];
};

let reportId: number;

class RecordEntry extends React.Component<Props, EntryState> {
    state: EntryState;

    constructor(props: Props) {
        super(props);
        this.state = {
            id: props.id,
            question: props.question,
            answer: props.answer,
            type: props.type,
            entryField: [],
            options: Array.from(props.options.values()),
            choice: props.choice,
            isEdit: false,
        };
        switch (props.type) {
            case RecordType.written:
                this.state.entryField = this.writtenQuestion();
                break;
            case RecordType.MCQ:
                this.state.entryField = this.mcq();
                break;
        }
    }

    // to do need change
    update() {
        updateQuestion(this.state.id, this.state.question, this.state.answer)
    }

    setQuestionAnswer(question: string, answer: string) {
        this.setState({question: question, answer: answer});
    }

    changeType(event: SelectChangeEvent) {
        switch (event.target.value) {
            case RecordType.MCQ:
                if (this.state.type !== RecordType.MCQ) {
                    this.setState({type: RecordType.MCQ});
                    addMultipleChoiceQuestion(reportId, this.state.question).then((r: any) => {
                        this.setState({id: r.id, entryField: this.mcq()});
                    });
                }
                break;
            case RecordType.written:
                if (this.state.type !== RecordType.written) {
                    this.setState({type: RecordType.written});
                    addQuestion(reportId, this.state.question).then((r: any) => {
                        this.setState({id: r.id, entryField: this.writtenQuestion()});
                    });
                }
                break;
        }
    }

    writtenQuestion() {
        let entryList: any[] = [(
            <Grid item xs={10}>
                <TextField fullWidth id="field" label="Field" variant="outlined"
                           defaultValue={this.state.question} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState({question: event.target.value});
                    this.update();
                }}/>
            </Grid>
        ), (
            <Grid item xs={12}>
                <TextField fullWidth id="value" label="Value" variant="outlined"
                           defaultValue={this.state.answer} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState({question: event.target.value});
                    this.update();
                }}/>
            </Grid>
        )];
        return entryList;
    }

    mcq() {
        if (this.state.options.length === 0) {
            this.setState({isEdit: true});
        }
        let entryList: any[] = [(
            <Grid item xs={10}>
                <TextField fullWidth id="field" label="Field" variant="outlined"
                           defaultValue={this.state.question} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState({question: event.target.value});
                    this.update();
                }}/>
            </Grid>
        )];
        if (this.state.isEdit) {
            this.state.options.forEach((value, index) => {
                entryList.push(
                    <Grid item xs={4}>
                        <TextField fullWidth id="choices" label={String.fromCharCode(65 + index)} variant="standard"
                                   InputProps={{endAdornment: (
                                       <InputAdornment position="end">
                                           <IconButton onClick={event => {
                                               this.setState({options: this.state.options.splice(index, 1)})
                                               this.setState({entryField: this.mcq()});
                                               // update to server
                                           }}>
                                               <DeleteForeverIcon />
                                           </IconButton>
                                       </InputAdornment>)}}
                                   defaultValue={value} onChange={event => {
                            this.setState({options: this.state.options.splice(index, 1, event.target.value)})
                            // this.update();
                        }}/>
                    </Grid>
                )
            });
            entryList.push(
                <Grid item xs={4}>
                    <IconButton onClick={event => {
                        this.setState({options: [...this.state.options, ""]});
                        this.setState({entryField: this.mcq()});
                        // update to server
                    }}>
                        <AddIcon />
                    </IconButton>
                    <IconButton onClick={event => {
                        this.setState({isEdit: false});
                        this.setState({entryField: this.mcq()});
                    }}>
                        <CheckIcon />
                    </IconButton>
                </Grid>
            );
        } else {
            entryList.push(
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <RadioGroup row name="mcq-options" defaultValue={this.state.choice} onChange={event => {
                            this.setState({choice: event.target.value});
                            // push to server
                        }}>
                            {this.state.options.map((value, index) => {
                                return (<FormControlLabel value={String.fromCharCode(65 + index)} control={<Radio />} label={value} />)
                            })}
                            <IconButton onClick={event => {
                                this.setState({isEdit: true});
                                this.setState({entryField: this.mcq()});
                            }}>
                                <EditIcon />
                            </IconButton>
                        </RadioGroup>
                    </FormControl>
                </Grid>
            );
        }
        return entryList;
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
                                    onChange={(event) => {this.changeType(event)}}
                                >
                                    <MenuItem value={RecordType.written}>Written</MenuItem>
                                    <MenuItem value={RecordType.MCQ}>Multiple Choice</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {this.state.entryField}
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
        id: 0,
    };

    constructor(props: {department: string}) {
        super(props)
        /**
         * Todo: This is dangerous, need to fix in future.
         * Your axios requests are async, so there's no guarantee there order of execution.
         * You could try to get a dep before creating a dep. try chaining them toghether.
         */
        newReport(props.department).catch(error => {
            console.log(error.message);
        })
        getReportByDeptName(props.department).then((r: any) => {
            let questionList: any[] = r.questions;
            let entryList: any[] = [];
            questionList.forEach(e => {
                entryList = [...entryList, this.existEntry(e.id, e.question, e.answer)]
            })
            /**
             * Todo: this should be changed as well.
             * What if you constantly get new data? your component will keep rerendering.
             */
            this.setState({id: r.id, entryList: entryList});
            reportId = r.id;
        })
    }

    newEntry(id: number) {
        return <RecordEntry id={id} type={RecordType.written} question={""} answer={""} choice={""} options={new Map<string, string>()}/>
    }

    existEntry(id: number, question: string, answer: string) {
        return <RecordEntry id={id} type={RecordType.written} question={question} answer={answer} choice={""} options={new Map<string, string>()}/>
    }

    createNewEntry() {
        addEmptyQuestion(this.state.id).then((r: any) => {
            let entry: any = this.newEntry(r.id);
            this.setState({entryList: [...this.state.entryList, entry]});
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
