import React, { useEffect, useState } from 'react';
import { getUsers } from './api';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Avatar,
  Chip,
  Box,
  Fade,
  Grow,
  Zoom,
  Slide,
  Badge,
  Divider,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  TrendingUp as TrendingIcon,
  WorkspacePremium as CrownIcon,
  LocalFireDepartment as FireIcon,
  AutoAwesome as SparkleIcon,
  Celebration as CelebrationIcon,
  Diamond as DiamondIcon,
} from '@mui/icons-material';

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data);
      setAnimationKey(prev => prev + 1); // Trigger re-animation
    } catch (error) {
      alert('Failed to fetch users');
    }
    setLoading(false);
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <CrownIcon sx={{ color: '#ffd700', fontSize: 32, filter: 'drop-shadow(0 0 10px #ffd700)' }} />;
      case 2: return <TrophyIcon sx={{ color: '#c0c0c0', fontSize: 28, filter: 'drop-shadow(0 0 8px #c0c0c0)' }} />;
      case 3: return <TrophyIcon sx={{ color: '#cd7f32', fontSize: 28, filter: 'drop-shadow(0 0 8px #cd7f32)' }} />;
      case 4: return <DiamondIcon sx={{ color: '#b9f2ff', fontSize: 24 }} />;
      case 5: return <StarIcon sx={{ color: '#e5e4e2', fontSize: 24 }} />;
      default: return <StarIcon sx={{ color: '#1976d2', fontSize: 20 }} />;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return '#ffd700';
      case 2: return '#c0c0c0';
      case 3: return '#cd7f32';
      case 4: return '#b9f2ff';
      case 5: return '#e5e4e2';
      default: return '#1976d2';
    }
  };

  const getRankGradient = (rank) => {
    switch (rank) {
      case 1: return 'linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #fff59d 100%)';
      case 2: return 'linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 50%, #f5f5f5 100%)';
      case 3: return 'linear-gradient(135deg, #cd7f32 0%, #daa520 50%, #f4a460 100%)';
      case 4: return 'linear-gradient(135deg, #b9f2ff 0%, #87ceeb 50%, #add8e6 100%)';
      case 5: return 'linear-gradient(135deg, #e3e0f0ff 0%, #d3b4ffff 50%, #ffffff 100%)';
      default: return 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #90caf9 100%)';
    }
  };

  const PodiumDisplay = ({ topUsers }) => (
    <Box sx={{ mb: 4, position: 'relative' }}>
      {/* Mobile Layout (xs to md) */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {topUsers.slice(0, 3).map((user, index) => (
          <Zoom in timeout={600 + index * 200} key={`mobile-${user._id}-${animationKey}`}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                mb: 2,
                background: getRankGradient(index + 1),
                borderRadius: 3,
                color: 'white',
                boxShadow: `0 4px 20px ${getRankColor(index + 1)}40`,
                border: `2px solid ${getRankColor(index + 1)}`,
              }}
            >
              <Avatar
                sx={{
                  width: { xs: 50, sm: 60 },
                  height: { xs: 50, sm: 60 },
                  background: 'rgba(255, 255, 255, 0.2)',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                {user.name.charAt(0)}
              </Avatar>
              
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  #{index + 1} {user.name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {user.totalPoints} points
                </Typography>
              </Box>
              
              <Box>
                {getRankIcon(index + 1)}
              </Box>
            </Box>
          </Zoom>
        ))}
      </Box>

      {/* Desktop Layout (md and up) */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'end' }}>
        {/* Podium Background */}
        <Box
          sx={{
            position: 'absolute',
            top: '60%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '40%',
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)',
            borderRadius: '20px 20px 0 0',
            zIndex: 0,
          }}
        />
        
        {/* 2nd Place */}
        {topUsers[1] && (
          <Zoom in timeout={1000} key={`second-${animationKey}`}>
            <Box sx={{ textAlign: 'center', mx: 2, position: 'relative', zIndex: 1 }}>
              {/* Podium Step */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 60,
                  background: getRankGradient(2),
                  borderRadius: '8px 8px 0 0',
                  border: '2px solid #c0c0c0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(192, 192, 192, 0.4)',
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="white">
                  2
                </Typography>
              </Box>
              
              <Box sx={{ position: 'relative', mb: 3 }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: -15,
                    right: -10,
                    background: getRankGradient(2),
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    boxShadow: '0 4px 16px rgba(192, 192, 192, 0.5)',
                  }}
                >
                  <Typography variant="body2" fontWeight="bold" color="white">
                    2
                  </Typography>
                </Box>
                
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    background: getRankGradient(2),
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    border: '4px solid #c0c0c0',
                    boxShadow: '0 8px 32px rgba(192, 192, 192, 0.4)',
                    animation: 'glow 3s infinite 0.5s',
                  }}
                >
                  {topUsers[1].name.charAt(0)}
                </Avatar>
                
                <Box sx={{ position: 'absolute', top: -5, left: -5 }}>
                  <SparkleIcon sx={{ color: '#c0c0c0', fontSize: 20, animation: 'pulse 2s infinite' }} />
                </Box>
              </Box>
              
              <Typography variant="h6" fontWeight="bold" sx={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                {topUsers[1].name}
              </Typography>
              
              <Chip
                icon={<TrendingIcon />}
                label={`${topUsers[1].totalPoints} pts`}
                sx={{
                  background: getRankGradient(2),
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  height: 32,
                  mt: 1,
                  boxShadow: '0 4px 16px rgba(192, 192, 192, 0.3)',
                }}
              />
            </Box>
          </Zoom>
        )}

        {/* 1st Place - Champion */}
        {topUsers[0] && (
          <Zoom in timeout={800} key={`first-${animationKey}`}>
            <Box sx={{ textAlign: 'center', mx: 2, position: 'relative', zIndex: 1 }}>
              {/* Champion Crown */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -30,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 3,
                }}
              >
                <CrownIcon 
                  sx={{ 
                    color: '#ffd700', 
                    fontSize: 40,
                    filter: 'drop-shadow(0 0 15px #ffd700)',
                    animation: 'float 3s ease-in-out infinite',
                  }} 
                />
              </Box>
              
              {/* Podium Step - Tallest */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 100,
                  height: 80,
                  background: getRankGradient(1),
                  borderRadius: '12px 12px 0 0',
                  border: '3px solid #ffd700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(255, 215, 0, 0.6)',
                }}
              >
                <Typography variant="h5" fontWeight="bold" color="white">
                  1
                </Typography>
              </Box>
              
              <Box sx={{ position: 'relative', mb: 3 }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -15,
                    background: getRankGradient(1),
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    boxShadow: '0 6px 24px rgba(255, 215, 0, 0.6)',
                  }}
                >
                  <CrownIcon sx={{ color: 'white', fontSize: 24 }} />
                </Box>
                
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    background: getRankGradient(1),
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    border: '5px solid #ffd700',
                    boxShadow: '0 12px 48px rgba(255, 215, 0, 0.6)',
                    animation: 'glow 2s infinite',
                  }}
                >
                  {topUsers[0].name.charAt(0)}
                </Avatar>
                
                {/* Celebration particles */}
                <Box sx={{ position: 'absolute', top: -10, left: -10 }}>
                  <CelebrationIcon sx={{ color: '#ffd700', fontSize: 24, animation: 'pulse 1.5s infinite' }} />
                </Box>
                <Box sx={{ position: 'absolute', top: -10, right: -10 }}>
                  <SparkleIcon sx={{ color: '#ffd700', fontSize: 20, animation: 'pulse 1.5s infinite 0.5s' }} />
                </Box>
              </Box>
              
              <Typography variant="h5" fontWeight="bold" sx={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                {topUsers[0].name}
              </Typography>
              
              <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                🏆 CHAMPION 🏆
              </Typography>
              
              <Chip
                icon={<FireIcon />}
                label={`${topUsers[0].totalPoints} pts`}
                sx={{
                  background: getRankGradient(1),
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  height: 40,
                  px: 2,
                  boxShadow: '0 6px 24px rgba(255, 215, 0, 0.4)',
                  animation: 'pulse 2s infinite',
                }}
              />
            </Box>
          </Zoom>
        )}

        {/* 3rd Place */}
        {topUsers[2] && (
          <Zoom in timeout={1200} key={`third-${animationKey}`}>
            <Box sx={{ textAlign: 'center', mx: 2, position: 'relative', zIndex: 1 }}>
              {/* Podium Step */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 40,
                  background: getRankGradient(3),
                  borderRadius: '8px 8px 0 0',
                  border: '2px solid #cd7f32',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(205, 127, 50, 0.4)',
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="white">
                  3
                </Typography>
              </Box>
              
              <Box sx={{ position: 'relative', mb: 3 }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: -15,
                    right: -10,
                    background: getRankGradient(3),
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    boxShadow: '0 4px 16px rgba(205, 127, 50, 0.5)',
                  }}
                >
                  <Typography variant="body2" fontWeight="bold" color="white">
                    3
                  </Typography>
                </Box>
                
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    background: getRankGradient(3),
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    border: '4px solid #cd7f32',
                    boxShadow: '0 8px 32px rgba(205, 127, 50, 0.4)',
                    animation: 'glow 3s infinite 1s',
                  }}
                >
                  {topUsers[2].name.charAt(0)}
                </Avatar>
                
                <Box sx={{ position: 'absolute', top: -5, left: -5 }}>
                  <SparkleIcon sx={{ color: '#cd7f32', fontSize: 20, animation: 'pulse 2s infinite 1s' }} />
                </Box>
              </Box>
              
              <Typography variant="h6" fontWeight="bold" sx={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                {topUsers[2].name}
              </Typography>
              
              <Chip
                icon={<TrendingIcon />}
                label={`${topUsers[2].totalPoints} pts`}
                sx={{
                  background: getRankGradient(3),
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  height: 32,
                  mt: 1,
                  boxShadow: '0 4px 16px rgba(205, 127, 50, 0.3)',
                }}
              />
            </Box>
          </Zoom>
        )}
      </Box>
    </Box>
  );

  const topThree = users.slice(0, 3);
  const remainingUsers = users.slice(3);

  return (
    <Grow in timeout={800}>
      <Card sx={{ borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
        {/* Header with animated background */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #90caf9 100%)',
            backgroundSize: '200% 200%',
            animation: 'rainbow 8s ease infinite',
            color: 'white',
            p: 4,
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
              background: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
              pointerEvents: 'none',
            },
          }}
        >
          <Badge badgeContent={users.length} color="secondary" max={99}>
            <TrophyIcon sx={{ fontSize: 50, mb: 2, filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }} />
          </Badge>
          
          <Typography variant="h3" fontWeight="bold" sx={{ mb: 1, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            🏆 Championship Leaderboard
          </Typography>
          
          <Typography variant="h6" sx={{ opacity: 0.9, textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            Live Rankings • Real-time Updates
          </Typography>
        </Box>
        
        <CardContent sx={{ p: 4 }}>
          {loading ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <CircularProgress size={80} thickness={4} />
              <Typography variant="h5" sx={{ mt: 3, color: 'text.secondary' }}>
                Loading Championship Data...
              </Typography>
            </Box>
          ) : (
            <>
              {/* Podium Display for Top 3 */}
              <PodiumDisplay topUsers={topThree} />
              
              {/* Divider */}
              <Divider sx={{ my: 4, opacity: 0.3 }} />
              
              {/* Remaining Users - Mobile and Desktop Layouts */}
              {remainingUsers.length > 0 && (
                <>
                  {/* Mobile Card Layout */}
                  <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    {remainingUsers.map((user, idx) => (
                      <Fade in timeout={400 + idx * 100} key={`mobile-card-${user._id}`}>
                        <Paper
                          sx={{
                            mb: 2,
                            p: 2,
                            borderLeft: `4px solid ${getRankColor(idx + 4)}`,
                            borderRadius: 3,
                            '&:hover': {
                              background: 'rgba(99, 102, 241, 0.05)',
                              transform: 'translateX(4px)',
                              transition: 'all 0.3s ease',
                            },
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {getRankIcon(idx + 4)}
                              <Typography variant="h6" fontWeight="bold">
                                #{idx + 4}
                              </Typography>
                            </Box>
                            
                            <Avatar
                              sx={{
                                background: getRankGradient(idx + 4),
                                width: 40,
                                height: 40,
                                fontWeight: 'bold',
                              }}
                            >
                              {user.name.charAt(0)}
                            </Avatar>
                            
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="h6" fontWeight="500">
                                {user.name}
                              </Typography>
                              <Chip
                                icon={<TrendingIcon />}
                                label={`${user.totalPoints} pts`}
                                size="small"
                                sx={{
                                  background: getRankGradient(idx + 4),
                                  color: 'white',
                                  fontWeight: 'bold',
                                }}
                              />
                            </Box>
                          </Box>
                        </Paper>
                      </Fade>
                    ))}
                  </Box>

                  {/* Desktop Table Layout */}
                  <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Slide direction="up" in timeout={1000}>
                      <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: 'hidden' }}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', py: 2 }}>
                                Rank
                              </TableCell>
                              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', py: 2 }}>
                                Player
                              </TableCell>
                              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1.1rem', py: 2 }}>
                                Points
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {remainingUsers.map((user, idx) => (
                              <Fade in timeout={400 + idx * 100} key={user._id}>
                                <TableRow
                                  sx={{
                                    '&:hover': {
                                      background: 'rgba(99, 102, 241, 0.05)',
                                      transform: 'scale(1.01)',
                                      transition: 'all 0.3s ease',
                                    },
                                    borderLeft: `4px solid ${getRankColor(idx + 4)}`,
                                    transition: 'all 0.3s ease',
                                  }}
                                >
                                  <TableCell sx={{ py: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      {getRankIcon(idx + 4)}
                                      <Typography variant="h6" fontWeight="bold">
                                        #{idx + 4}
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                  <TableCell sx={{ py: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                      <Avatar
                                        sx={{
                                          background: getRankGradient(idx + 4),
                                          width: 45,
                                          height: 45,
                                          fontWeight: 'bold',
                                          fontSize: '1.1rem',
                                        }}
                                      >
                                        {user.name.charAt(0)}
                                      </Avatar>
                                      <Typography variant="h6" fontWeight="500">
                                        {user.name}
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                  <TableCell align="right" sx={{ py: 2 }}>
                                    <Chip
                                      icon={<TrendingIcon />}
                                      label={`${user.totalPoints} pts`}
                                      sx={{
                                        background: getRankGradient(idx + 4),
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        height: 40,
                                      }}
                                    />
                                  </TableCell>
                                </TableRow>
                              </Fade>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Slide>
                  </Box>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Grow>
  );
}

export default Leaderboard;
