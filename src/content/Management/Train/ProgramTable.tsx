import { FC, ChangeEvent, useState, useEffect } from 'react';
import axios from 'axios';
import { successNotification } from '@/utils/notification';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Button,
  TextField
} from '@mui/material';
import Label from '@/components/Label';
import { ProgramData, ProgramDataStatus } from '@/models/program_data';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from '@mui/material/styles';
import AddModal from '@/content/Management/Train/AddModal';
import DeleteModal from '@/content/Management/Train/DeleteModal';
import * as React from 'react';

interface ProgramDataTableProps {
  className?: string;
  id: string;
}

interface Filters {
  status?: ProgramDataStatus;
}

const getStatusLabel = (ProgramDataStatus: ProgramDataStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    null: {
      text: 'Pending',
      color: 'warning'
    },
    training: {
      text: 'Training',
      color: 'primary'
    }
  };
  const { text, color }: any = map[ProgramDataStatus];
  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  programDatas: ProgramData[],
  filters: Filters
): ProgramData[] => {
  return programDatas.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  programDatas: ProgramData[],
  page: number,
  limit: number
): ProgramData[] => {
  return programDatas.slice(page * limit, page * limit + limit);
};

const ButtonTrain = styled(Button)(
  ({ theme }) => `
  background: ${theme.colors.info.dark};
  color: ${theme.palette.success.contrastText};
  height: 50%;
  align-items: center;
  &:hover {
    background: ${theme.colors.info.main};
  }
  `
);
const ButtonAdd = styled(Button)(
  ({ theme }) => `
  background: ${theme.colors.primary.dark};
     color: ${theme.palette.success.contrastText};
     height: 50%;
     align-items: center;
     &:hover {
      background: ${theme.colors.primary.main};
   }
    `
);
const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.dark};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.main};
     }
    `
);
const ProgramTable: FC<ProgramDataTableProps> = ({ id }) => {
  const [selectedprogramDatas, setSelectedprogramDatas] = useState<number[]>(
    []
  );
  const [programDatas, setProgramDatas] = useState([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: 'completed'
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'Completed'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'training',
      name: 'Training'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllprogramDatas = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedprogramDatas(
      event.target.checked
        ? programDatas.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    _event: ChangeEvent<HTMLInputElement>,
    programDataID: number
  ): void => {
    if (!selectedprogramDatas.includes(programDataID)) {
      setSelectedprogramDatas((prevSelected) => [
        ...prevSelected,
        programDataID
      ]);
    } else {
      setSelectedprogramDatas((prevSelected) =>
        prevSelected.filter((id) => id !== programDataID)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredprogramDatas = applyFilters(programDatas, filters);
  const paginatedprogramDatas = applyPagination(
    filteredprogramDatas,
    page,
    limit
  );
  const selectedSomeprogramDatas =
    selectedprogramDatas.length > 0 &&
    selectedprogramDatas.length < programDatas.length;
  const selectedAllprogramDatas =
    selectedprogramDatas.length === programDatas.length;
  const theme = useTheme();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [trainId, setTrainId] = useState(0);
  const [addData, setAddData] = useState({
    module_num: '',
    session_title: '',
    over_goal: '',
    learn_obj: '',
    video_litmos: '',
    video_train: '',
    video_implement: '',
    doc_link: ''
  });
  const [deleteID, setDeleteID] = useState<string>('0');
  const getList = () => {
    axios
      .get(`/api/data/${id}`, {
        params: { search: searchTerm }
      })
      .then((res) => {
        setProgramDatas(res.data);
      })
      .catch((error) => console.log('*******err', error.data));
  };

  useEffect(() => {
    if (id != '0') {
      getList();
    }
  }, [addModalOpen, deleteModalOpen, id]);
  useEffect(() => {
    if (id != '0') {
      const timer = setInterval(() => {
        getList();
        if (trainId)
          axios.get(`/api/train/${trainId}`).then((res) => {
            if (res.data[0].status == 'completed') {
              successNotification('Training is done.');
              setTrainId(0);
            }
          });
      }, 60000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [id, trainId]);

  const onTrain = () => {
    if (selectedprogramDatas.length) {
    } else {
      axios
        .post('/api/train', { program_id: id })
        .then((train) => {
          setTrainId(train.data[0].id);
          axios
            .get(`/api/data/${id}`, { params: { search: '' } })
            .then((data) => {
              axios
                .post('https://api.tradies-success-academy.com/api/train', data)
                .then(() => {
                  successNotification('Training is started.');
                  getList();
                })
                .catch((error) => console.log('*******err', error));
            })
            .catch((error) => console.log('*******err', error));
        })
        .catch((error) => console.log('*******err', error));
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Card style={{ marginTop: '8px' }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box
          marginLeft={'10px'}
          style={{ marginLeft: '10px' }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <TextField
            fullWidth
            size="small"
            InputProps={{
              onKeyDown: (event) => {
                if (event.key === 'Enter') {
                  getList();
                }
              },
              endAdornment: (
                <IconButton
                  onClick={() => getList()}
                  type="button"
                  sx={{ p: '10px' }}
                  aria-label="search"
                >
                  <SearchTwoToneIcon />
                </IconButton>
              )
            }}
            placeholder="Input search text."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <CardHeader
            action={
              <Box width={150}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Status</InputLabel>
                  <Select
                    size="medium"
                    value={filters.status || 'all'}
                    onChange={handleStatusChange}
                    label="Status"
                    autoWidth
                  >
                    {statusOptions.map((statusOption) => (
                      <MenuItem key={statusOption.id} value={statusOption.id}>
                        {statusOption.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            }
            title=""
          />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <ButtonError
            sx={{ mr: 1 }}
            startIcon={<DeleteTwoToneIcon />}
            variant="contained"
            disabled={selectedprogramDatas.length ? false : true}
            onClick={() => {
              setDeleteModalOpen(true);
            }}
          >
            Delete
          </ButtonError>
          <ButtonTrain
            sx={{ mr: 1 }}
            startIcon={<ModelTrainingIcon />}
            variant="contained"
            disabled={trainId != 0 || programDatas.length == 0 ? true : false}
            onClick={() => onTrain()}
          >
            Train
          </ButtonTrain>
          <ButtonAdd
            sx={{ mr: 1 }}
            startIcon={<AddCircleOutlineIcon />}
            variant="contained"
            onClick={() => setAddModalOpen(true)}
          >
            Add
          </ButtonAdd>
        </Box>
      </Box>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllprogramDatas}
                  indeterminate={selectedSomeprogramDatas}
                  onChange={handleSelectAllprogramDatas}
                />
              </TableCell>
              <TableCell align="center">Actions</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell>Module Number</TableCell>
              <TableCell>Session Title</TableCell>
              <TableCell>Overall goal</TableCell>
              <TableCell>Learning objectives</TableCell>
              <TableCell>Video File - Litmos</TableCell>
              <TableCell>Video File - Litmos (Training)</TableCell>
              <TableCell>Video File - Litmos (Implementation)</TableCell>
              <TableCell>Doc Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedprogramDatas.map((item) => {
              const isprogramDataselected = selectedprogramDatas.includes(
                item.id
              );
              return (
                <TableRow hover key={item.id} selected={isprogramDataselected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isprogramDataselected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, item.id)
                      }
                      value={isprogramDataselected}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip
                      title="Edit"
                      arrow
                      onClick={() => {
                        setAddData(item);
                        setAddModalOpen(true);
                      }}
                    >
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title="Delete"
                      arrow
                      onClick={() => {
                        setDeleteID(item.id.toString());
                        setDeleteModalOpen(true);
                      }}
                    >
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    {getStatusLabel(item.status)}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.module_num}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.session_title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.over_goal}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.learn_obj}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.video_litmos}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.video_train}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.video_implement}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.doc_link}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredprogramDatas.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      <DeleteModal
        open={deleteModalOpen}
        id={deleteID}
        ids={selectedprogramDatas}
        onClose={() => {
          setDeleteModalOpen(false);
        }}
      />
      <AddModal
        open={addModalOpen}
        data={addData}
        id={id}
        onClose={() => {
          setAddModalOpen(false);
          setAddData({
            module_num: '',
            session_title: '',
            over_goal: '',
            learn_obj: '',
            video_litmos: '',
            video_train: '',
            video_implement: '',
            doc_link: ''
          });
        }}
      />
    </Card>
  );
};

export default ProgramTable;
function useState<T>(arg0: undefined[]): [any, any] {
  throw new Error('Function not implemented.');
}

function useEffect(arg0: () => void, arg1: any[]) {
  throw new Error('Function not implemented.');
}
