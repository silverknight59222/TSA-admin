import { FC, ChangeEvent, useState, useEffect } from 'react';
import axios from 'axios';
import {
  Tooltip,
  Divider,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  Button,
  InputAdornment,
  TextField
} from '@mui/material';
import { ProgramData } from '@/models/program';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from '@mui/material/styles';
import ProgramModal from '@/content/Management/Program/ProgramModal';
import DeleteModal from '@/content/Management/Program/DeleteModal';
import React from 'react';

interface ProgramTableProps {
  className?: string;
}

const applyPagination = (
  programDatas: ProgramData[],
  page: number,
  limit: number
): ProgramData[] => {
  return programDatas.slice(page * limit, page * limit + limit);
};
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
const ProgramTable: FC<ProgramTableProps> = () => {
  const [programDatas, setProgramDatas] = useState([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedprogramDatas = applyPagination(programDatas, page, limit);
  const theme = useTheme();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addData, setAddData] = useState({
    name: '',
    description: ''
  });
  const [deleteID, setDeleteID] = useState<string>('0');

  useEffect(() => {
    axios
      .get(`/api/program`)
      .then(async (res) => {
        setProgramDatas(res.data);
      })
      .catch((error) => console.log('*******err', error.data));
  }, [addModalOpen, deleteModalOpen]);

  return (
    <Card style={{ marginTop: '8px' }}>
      <Box
        display="flex"
        padding="8px"
        alignItems="center"
        justifyContent="space-between"
      >
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
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
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
              <TableCell align="center">Actions</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedprogramDatas.map((item) => {
              return (
                <TableRow hover key={item.id}>
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
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.description}
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
          count={programDatas.length}
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
        onClose={() => {
          setDeleteModalOpen(false);
        }}
      />
      <ProgramModal
        open={addModalOpen}
        data={addData}
        onClose={() => {
          setAddModalOpen(false);
          setAddData({
            name: '',
            description: ''
          });
        }}
      />
    </Card>
  );
};

export default ProgramTable;
