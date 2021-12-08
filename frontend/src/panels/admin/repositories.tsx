import React, { useEffect, useState } from "react";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Collapse from '@material-ui/core/Collapse';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Client, LoggedUser, Repository, RepositoryConfiguration, RepositoryVersion, RepositoryVersionConfiguration } from "@substrate/playground-client";
import { useStyles, EnhancedTableToolbar, Resources } from '.';
import { ErrorSnackbar } from '../../components';
import { find } from "../../utils";

function RepositoryCreationDialog({ repositories, show, onCreate, onHide }: { repositories: Repository[], show: boolean, onCreate: (id: string, conf: RepositoryConfiguration) => void, onHide: () => void }): JSX.Element {

    const [id, setID] = React.useState('');
    const [url, setURL] = React.useState('');

    const handleIDChange = (event: React.ChangeEvent<HTMLInputElement>) => setID(event.target.value);
    const handleURLChange = (event: React.ChangeEvent<HTMLInputElement>) => setURL(event.target.value);
    return (
        <Dialog open={show} onClose={onHide} maxWidth="md">
            <DialogTitle>User details</DialogTitle>
            <DialogContent>
                <Container style={{display: "flex", flexDirection: "column"}}>
                    <TextField
                        style={{marginBottom: 20}}
                        value={id}
                        onChange={handleIDChange}
                        required
                        label="ID"
                        autoFocus
                        />
                    <TextField
                        style={{marginBottom: 20}}
                        value={url}
                        onChange={handleURLChange}
                        required
                        label="URL"
                        />
                    <ButtonGroup style={{alignSelf: "flex-end", marginTop: 20}} size="small">
                        <Button disabled={!id || find(repositories, id) != null|| !url} onClick={() => {onCreate(id.toLowerCase(), {tags: {"public": "true"}, url: url}); onHide();}}>CREATE</Button>
                        <Button onClick={onHide}>CLOSE</Button>
                    </ButtonGroup>
                </Container>
            </DialogContent>
        </Dialog>
    );
}

function RepositoryRow({ client, repository }: { client: Client, repository: Repository }): JSX.Element {
    const [open, setOpen] = useState(false);
    const [history, setHistory] = useState<RepositoryVersion[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const versions = await client.listRepositoryVersions(repository.id);
                console.log(versions)
                setHistory(versions);
            } catch (e) {
                console.log(e);
            }
        }

        if (open) {
            fetchData();
        }
    }, [open]);

    return (
        <>
            <TableRow key={repository.id}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {repository.id}
                </TableCell>
                <TableCell>{repository.url}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div">
                            Versions
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                            <TableRow>
                                <TableCell>Reference</TableCell>
                                <TableCell>Version</TableCell>
                                <TableCell>State</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {history.map((version) => (
                                <TableRow key={version.reference}>
                                <TableCell component="th" scope="row">
                                    {version.reference}
                                </TableCell>
                                <TableCell>{version.imageSource}</TableCell>
                                <TableCell align="right">{version.state.tag}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

export function Repositories({ client, user }: { client: Client, user?: LoggedUser }): JSX.Element {
    const classes = useStyles();
    const [showCreationDialog, setShowCreationDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    return (
        <Resources<Repository> callback={async () => await client.listRepositories()}>
        {(resources: Repository[]) => (
            <>
                <EnhancedTableToolbar user={user} label="Repositories" onCreate={() => setShowCreationDialog(true)} />
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>ID</TableCell>
                                <TableCell>URL</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {resources.map(repository => (
                            <RepositoryRow client={client} repository={repository} />
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {errorMessage &&
                <ErrorSnackbar open={true} message={errorMessage} onClose={() => setErrorMessage(null)} />}
                {showCreationDialog &&
                <RepositoryCreationDialog
                    repositories={resources}
                    show={showCreationDialog}
                    onCreate={async (id, conf) => {
                        try {
                            await client.createRepository(id, conf);
                            await client.createRepositoryVersion(id, "1", {reference: "master"});
                        } catch (e) {
                            setErrorMessage(`Error during creation: ${e.message}`);
                        }
                    }}
                    onHide={() => setShowCreationDialog(false)} />}
            </>
            )}
        </Resources>
    );
}
