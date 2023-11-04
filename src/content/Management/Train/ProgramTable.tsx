import { FC, ChangeEvent, useState, useEffect } from 'react';
import axios from 'axios';
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
  InputAdornment,
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
import TrainModal from '@/content/Management/Train/TrainModal';
import AddModal from '@/content/Management/Train/AddModal';
import DeleteModal from '@/content/Management/Train/DeleteModal';
import React from 'react';

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
    pending: {
      text: 'Pending',
      color: 'warning'
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
  const selectedBulkActions = selectedprogramDatas.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
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

  const [trainModalOpen, setTrainModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addData, setAddData] = useState({
    module_num: '',
    session_title: '',
    video_link: '',
    doc_link: ''
  });
  const [deleteID, setDeleteID] = useState<string>('0');
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    if (id !== 'new') {
      axios
        .get(`/api/train/data/${id}`)
        .then(async (res) => {
          setProgramDatas(res.data);
        })
        .catch((error) => console.log('*******err', error.data));
    }
  }, [id, addModalOpen, trainModalOpen, deleteModalOpen]);

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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              )
            }}
            placeholder="Search..."
          />
          <CardHeader
            action={
              <Box width={150}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Status</InputLabel>
                  <Select
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
            onClick={() => {
              setTrainModalOpen(true);
            }}
          >
            Delete
          </ButtonError>
          <ButtonTrain
            sx={{ mr: 1 }}
            startIcon={<ModelTrainingIcon />}
            variant="contained"
            onClick={() => {
              setTrainModalOpen(true);
              setDataList(selectedprogramDatas);
            }}
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
              <TableCell>Video File - Litmos</TableCell>
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
                      fontWeight="bold"
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
                      fontWeight="bold"
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
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.video_link}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
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
      <TrainModal
        open={trainModalOpen}
        setOpen={setTrainModalOpen}
        data={dataList}
        id={id}
      />
      <DeleteModal
        open={deleteModalOpen}
        id={deleteID}
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
            video_link: '',
            doc_link: ''
          });
        }}
      />
    </Card>
  );
};

export default ProgramTable;