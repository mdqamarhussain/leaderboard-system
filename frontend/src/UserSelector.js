import React, { useEffect, useState } from 'react';
import { getUsers, addUser } from './api';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Fade,
  Grow,
  Snackbar,
  Alert,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Zoom,
  Slide,
  Paper,
  Divider,
  Badge,
} from '@mui/material';
import {
  PersonAdd as AddPersonIcon,
  People as PeopleIcon,
  CheckCircle as CheckIcon,
  Star as StarIcon,
  TrendingUp as TrendingIcon,
  AutoAwesome as SparkleIcon,
  Refresh as RefreshIcon,
  AccountCircle as AccountIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';

function UserSelector({ selectedUser, setSelectedUser, refreshUsers }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [addingUser, setAddingUser] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [refreshUsers]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data);
      if (!selectedUser && res.data.length > 0) {
        setSelectedUser(res.data[0]._id);
      }
      setAnimationKey(prev => prev + 1);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to fetch users', severity: 'error' });
    }
    setLoading(false);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.trim()) {
      setSnackbar({ open: true, message: 'Please enter a valid name', severity: 'warning' });
      return;
    }
    
    setAddingUser(true);
    try {
      await addUser(newUser.trim());
      setNewUser('');
      fetchUsers();
      if (typeof refreshUsers === 'function') refreshUsers();
      setSnackbar({ 
        open: true, 
        message: `🎉 ${newUser.trim()} joined the championship!`, 
        severity: 'success' 
      });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to add user', severity: 'error' });
    }
    setAddingUser(false);
  };

  const selectedUserData = users.find(user => user._id === selectedUser);

  const getUserRank = (userId) => {
    const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);
    return sortedUsers.findIndex(user => user._id === userId) + 1;
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <TrophyIcon sx={{ color: '#ffd700', fontSize: 20 }} />;
    if (rank <= 3) return <TrophyIcon sx={{ color: '#c0c0c0', fontSize: 18 }} />;
    if (rank <= 5) return <StarIcon sx={{ color: '#cd7f32', fontSize: 16 }} />;
    return <AccountIcon sx={{ color: '#1976d2', fontSize: 16 }} />;
  };

  return (
    <Grow in timeout={600}>
      <Card sx={{ height: 'fit-content', position: 'relative', overflow: 'visible' }}>
        {/* Floating decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: -10,
            right: -10,
            width: 40,
            height: 40,
            background: 'linear-gradient(135deg, #ff6b35, #ff8a65)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            animation: 'float 3s ease-in-out infinite',
            boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4)',
          }}
        >
          <SparkleIcon sx={{ color: 'white', fontSize: 24 }} />
        </Box>

        {/* Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #ff6b35 0%, #ff8a65 50%, #ffab91 100%)',
            backgroundSize: '200% 200%',
            animation: 'rainbow 6s ease infinite',
            color: 'white',
            p: 3,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
              pointerEvents: 'none',
            },
          }}
        >
          <Badge badgeContent={users.length} color="secondary" max={99}>
            <PeopleIcon sx={{ fontSize: 40, mb: 1, filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }} />
          </Badge>
          
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            Player Hub
          </Typography>
          
          <Typography variant="subtitle1" sx={{ opacity: 0.9, textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            Manage Champions
          </Typography>
        </Box>
        
        <CardContent sx={{ p: 3 }}>
          {/* Add New Player Section */}
          <Fade in timeout={800}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(102, 187, 106, 0.05) 100%)',
                border: '1px solid rgba(76, 175, 80, 0.2)',
              }}
            >
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  color: '#2e7d32',
                  fontWeight: 600,
                }}
              >
                <AddPersonIcon />
                Add New Champion
              </Typography>
              
              <Box component="form" onSubmit={handleAddUser} sx={{ 
  display: 'flex', 
  flexDirection: { xs: 'column', sm: 'row' },
  gap: { xs: 2, sm: 1 }
}}>

                <TextField
                  fullWidth
                  value={newUser}
                  onChange={(e) => setNewUser(e.target.value)}
                  placeholder="Enter champion name..."
                  variant="outlined"
                  size="small"
                  disabled={addingUser}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      background: 'rgba(255, 255, 255, 0.9)',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 1)',
                      },
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={addingUser || !newUser.trim()}
                  startIcon={addingUser ? <RefreshIcon sx={{ animation: 'spin 1s linear infinite' }} /> : <AddPersonIcon />}
                  sx={{
                    minWidth: 140,
                    minHeight: '44px',
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #4caf50, #66bb6a)',
                    fontSize: { xs: '1rem', sm: '0.875rem' },
                    '&:hover': {
                      background: 'linear-gradient(135deg, #388e3c, #4caf50)',
                      transform: 'translateY(-2px)',
                    },
                    '&:disabled': {
                      background: '#ccc',
                    },
                  }}
                >
                  {addingUser ? 'Adding...' : 'Add Player'}
                </Button>
              </Box>
            </Paper>
          </Fade>

          {/* Current Selection Display */}
          {selectedUserData && (
            <Zoom in timeout={1000} key={`selection-${animationKey}`}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  mb: 3,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(66, 165, 245, 0.05) 100%)',
                  border: '2px solid #1976d2',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #1976d2, transparent)',
                  },
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    color: '#1976d2',
                    fontWeight: 600,
                  }}
                >
                  <CheckIcon />
                  Selected Champion
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Avatar
                    sx={{
                      width: 70,
                      height: 70,
                      background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                      fontSize: '1.8rem',
                      fontWeight: 'bold',
                      border: '3px solid #1976d2',
                      boxShadow: '0 8px 32px rgba(25, 118, 210, 0.3)',
                    }}
                  >
                    {selectedUserData.name.charAt(0)}
                  </Avatar>
                  
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: '#1976d2', mb: 1 }}>
                      {selectedUserData.name}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        icon={<TrendingIcon />}
                        label={`${selectedUserData.totalPoints} Points`}
                        color="primary"
                        variant="outlined"
                        sx={{ fontWeight: 'bold' }}
                      />
                      
                      <Chip
                        icon={getRankIcon(getUserRank(selectedUserData._id))}
                        label={`Rank #${getUserRank(selectedUserData._id)}`}
                        color="secondary"
                        variant="outlined"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Zoom>
          )}

          {/* Player Selection */}
          <Fade in timeout={1200}>
            <Box>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  color: '#6366f1',
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                <AccountIcon />
                Choose Your Champion
              </Typography>
              
              <FormControl fullWidth>
                <InputLabel sx={{ fontWeight: 500 }}>Select a player to compete</InputLabel>
                <Select
                  value={selectedUser || ''}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  label="Select a player to compete"
                  sx={{
                    borderRadius: 3,
                    '& .MuiSelect-select': {
                      py: 2,
                    },
                  }}
                >
                  {users.map((user, index) => {
                    const rank = getUserRank(user._id);
                    return (
                      <MenuItem key={user._id} value={user._id}>
                        <Slide direction="right" in timeout={200 + index * 50}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                background: `linear-gradient(135deg, ${
                                  rank === 1 ? '#ffd700, #ffed4e' :
                                  rank <= 3 ? '#c0c0c0, #e8e8e8' :
                                  rank <= 5 ? '#cd7f32, #daa520' :
                                  '#1976d2, #42a5f5'
                                })`,
                                fontSize: '1rem',
                                fontWeight: 'bold',
                              }}
                            >
                              {user.name.charAt(0)}
                            </Avatar>
                            
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body1" fontWeight="600">
                                {user.name}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                {getRankIcon(rank)}
                                <Typography variant="caption" color="text.secondary">
                                  Rank #{rank} • {user.totalPoints} pts
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Slide>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Fade>

          {/* Quick Stats */}
          <Fade in timeout={1400}>
            <Box sx={{ mt: 3 }}>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              <Typography variant="subtitle2" color="text.secondary" sx={{ textAlign: 'center' }}>
                🏆 {users.length} Champions Ready • 🎯 Next Claim Awaits
              </Typography>
            </Box>
          </Fade>
        </CardContent>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            severity={snackbar.severity} 
            sx={{ 
              width: '100%',
              borderRadius: 3,
              fontWeight: 500,
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Card>
    </Grow>
  );
}

// Add keyframe for spin animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

export default UserSelector;
