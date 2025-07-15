import React, { useEffect, useState } from 'react';
import { getClaimHistory } from './api';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Box,
  Grow,
  Fade,
  Slide,
  Divider,
  Badge,
  Paper,
  IconButton,
  Tooltip,
  Collapse,
  LinearProgress,
} from '@mui/material';
import {
  History as HistoryIcon,
  Person as PersonIcon,
  AccessTime as TimeIcon,
  TrendingUp as TrendingIcon,
  AutoAwesome as SparkleIcon,
  LocalFireDepartment as FireIcon,
  Star as StarIcon,
  EmojiEvents as TrophyIcon,
  Celebration as CelebrationIcon,
  ExpandMore as ExpandIcon,
  ExpandLess as CollapseIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';

function ClaimHistory({ refreshFlag }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    fetchHistory();
  }, [refreshFlag]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await getClaimHistory();
      setHistory(res.data);
      setAnimationKey(prev => prev + 1);
    } catch (error) {
      alert('Failed to fetch claim history');
    }
    setLoading(false);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPointsColor = (points) => {
    if (points >= 9) return '#ff1744';
    if (points >= 7) return '#ff6b35';
    if (points >= 5) return '#ffd700';
    if (points >= 3) return '#4caf50';
    return '#2196f3';
  };

  const getPointsGradient = (points) => {
    if (points >= 9) return 'linear-gradient(135deg, #ff1744, #ff5722)';
    if (points >= 7) return 'linear-gradient(135deg, #ff6b35, #ff8a65)';
    if (points >= 5) return 'linear-gradient(135deg, #ffd700, #ffeb3b)';
    if (points >= 3) return 'linear-gradient(135deg, #4caf50, #66bb6a)';
    return 'linear-gradient(135deg, #2196f3, #42a5f5)';
  };

  const getPointsIcon = (points) => {
    if (points >= 9) return <FireIcon sx={{ fontSize: 20, color: 'white' }} />;
    if (points >= 7) return <TrophyIcon sx={{ fontSize: 18, color: 'white' }} />;
    if (points >= 5) return <StarIcon sx={{ fontSize: 18, color: 'white' }} />;
    if (points >= 3) return <SparkleIcon sx={{ fontSize: 16, color: 'white' }} />;
    return <TrendingIcon sx={{ fontSize: 16, color: 'white' }} />;
  };

  const getAchievementBadge = (points) => {
    if (points >= 9) return { text: 'LEGENDARY', color: '#ff1744' };
    if (points >= 7) return { text: 'EPIC', color: '#ff6b35' };
    if (points >= 5) return { text: 'RARE', color: '#ffd700' };
    if (points >= 3) return { text: 'GOOD', color: '#4caf50' };
    return { text: 'LUCKY', color: '#2196f3' };
  };

  const EmptyState = () => (
    <Box sx={{ textAlign: 'center', py: 6 }}>
      <TimelineIcon sx={{ fontSize: 80, color: '#e0e0e0', mb: 2 }} />
      <Typography variant="h5" color="text.secondary" gutterBottom>
        No Claims Yet
      </Typography>
      <Typography variant="body1" color="text.secondary">
        The championship history will appear here once players start claiming points!
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Chip
          label="🎲 Start Rolling to Create History"
          variant="outlined"
          color="primary"
          sx={{ fontSize: '1rem', py: 2, px: 1 }}
        />
      </Box>
    </Box>
  );

  return (
    <Grow in timeout={900}>
      <Card sx={{ height: 'fit-content', maxHeight: 700, overflow: 'hidden', position: 'relative' }}>
        {/* Floating decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: -12,
            right: -12,
            width: 48,
            height: 48,
            background: 'linear-gradient(135deg, #4caf50, #66bb6a)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            animation: 'float 3s ease-in-out infinite 1s',
            boxShadow: '0 6px 24px rgba(76, 175, 80, 0.4)',
          }}
        >
          <TimelineIcon sx={{ color: 'white', fontSize: 28 }} />
        </Box>

        {/* Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 50%, #81c784 100%)',
            backgroundSize: '200% 200%',
            animation: 'rainbow 10s ease infinite',
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
              background: 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
              pointerEvents: 'none',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
            <Badge badgeContent={history.length} color="secondary" max={99}>
              <HistoryIcon sx={{ fontSize: 40, filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }} />
            </Badge>
            <IconButton
              onClick={() => setExpanded(!expanded)}
              sx={{ 
                ml: 2, 
                color: 'white',
                '&:hover': { background: 'rgba(255, 255, 255, 0.1)' }
              }}
            >
              {expanded ? <CollapseIcon /> : <ExpandIcon />}
            </IconButton>
          </Box>
          
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            📜 Championship Chronicle
          </Typography>
          
          <Typography variant="subtitle1" sx={{ opacity: 0.9, textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            Live Activity Feed • {history.length} Total Claims
          </Typography>
        </Box>
        
        <Collapse in={expanded}>
          <CardContent sx={{ p: 0, maxHeight: 500, overflow: 'auto' }}>
            {loading ? (
              <Box sx={{ p: 3 }}>
                <LinearProgress 
                  sx={{ 
                    borderRadius: 2, 
                    height: 6,
                    background: 'rgba(76, 175, 80, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(135deg, #4caf50, #66bb6a)',
                    }
                  }} 
                />
                <Typography variant="h6" sx={{ textAlign: 'center', mt: 2, color: 'text.secondary' }}>
                  Loading championship history...
                </Typography>
              </Box>
            ) : history.length === 0 ? (
              <EmptyState />
            ) : (
              <List sx={{ p: 0 }}>
                {history.slice(0, 15).map((entry, idx) => {
                  const achievement = getAchievementBadge(entry.pointsClaimed);
                  
                  return (
                    <Slide direction="left" in timeout={300 + idx * 50} key={`${entry._id}-${animationKey}`}>
                      <Box>
                        <ListItem 
                          sx={{ 
                            py: 2.5,
                            px: 3,
                            position: 'relative',
                            '&:hover': {
                              background: 'rgba(76, 175, 80, 0.05)',
                              transform: 'translateX(8px)',
                              transition: 'all 0.3s ease',
                            },
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              left: 0,
                              top: 0,
                              bottom: 0,
                              width: 4,
                              background: getPointsGradient(entry.pointsClaimed),
                              borderRadius: '0 2px 2px 0',
                            },
                          }}
                        >
                          <ListItemAvatar>
                            <Box sx={{ position: 'relative' }}>
                              <Avatar
                                sx={{
                                  width: 50,
                                  height: 50,
                                  background: getPointsGradient(entry.pointsClaimed),
                                  fontWeight: 'bold',
                                  fontSize: '1.2rem',
                                  border: `2px solid ${getPointsColor(entry.pointsClaimed)}`,
                                  boxShadow: `0 4px 16px ${getPointsColor(entry.pointsClaimed)}40`,
                                }}
                              >
                                {entry.userId?.name?.charAt(0) || '?'}
                              </Avatar>
                              
                              {/* Achievement badge */}
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: -8,
                                  right: -8,
                                  width: 24,
                                  height: 24,
                                  background: getPointsGradient(entry.pointsClaimed),
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  border: '2px solid white',
                                  boxShadow: `0 2px 8px ${getPointsColor(entry.pointsClaimed)}40`,
                                }}
                              >
                                {getPointsIcon(entry.pointsClaimed)}
                              </Box>
                            </Box>
                          </ListItemAvatar>
                          
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Typography variant="h6" fontWeight="bold" sx={{ color: 'text.primary' }}>
                                  {entry.userId?.name || 'Unknown Champion'}
                                </Typography>
                                
                                <Chip
                                  label={achievement.text}
                                  size="small"
                                  sx={{
                                    background: getPointsGradient(entry.pointsClaimed),
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '0.7rem',
                                    height: 20,
                                    '& .MuiChip-label': { px: 1 },
                                  }}
                                />
                              </Box>
                            }
                            secondary={
                              <Typography 
                                variant="caption" 
                                color="text.secondary" 
                                sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: 1, 
                                  mt: 0.5,
                                  fontWeight: 500 
                                }}
                                component="span"
                              >
                                <TimeIcon sx={{ fontSize: 16 }} />
                                {formatTime(entry.claimedAt)}
                                
                                {entry.pointsClaimed >= 8 && (
                                  <Tooltip title="Epic Roll!">
                                    <CelebrationIcon sx={{ fontSize: 16, color: '#ff6b35', ml: 1 }} />
                                  </Tooltip>
                                )}
                              </Typography>
                            }
                          />
                          
                          <Box sx={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                            <Chip
                              icon={getPointsIcon(entry.pointsClaimed)}
                              label={`+${entry.pointsClaimed}`}
                              sx={{
                                background: getPointsGradient(entry.pointsClaimed),
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                height: 36,
                                minWidth: 60,
                                boxShadow: `0 2px 8px ${getPointsColor(entry.pointsClaimed)}30`,
                              }}
                            />
                            
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                              #{idx + 1}
                            </Typography>
                          </Box>
                        </ListItem>
                        
                        {idx < Math.min(history.length, 15) - 1 && (
                          <Divider 
                            variant="inset" 
                            component="li" 
                            sx={{ 
                              ml: 8, 
                              borderColor: 'rgba(76, 175, 80, 0.1)',
                              borderWidth: 1,
                            }} 
                          />
                        )}
                      </Box>
                    </Slide>
                  );
                })}
                
                {history.length > 15 && (
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Showing latest 15 claims • {history.length - 15} more in history
                    </Typography>
                  </Box>
                )}
              </List>
            )}
          </CardContent>
        </Collapse>

        {/* Footer Stats */}
        <Fade in timeout={1500}>
          <Box
            sx={{
              p: 2,
              background: 'rgba(76, 175, 80, 0.05)',
              borderTop: '1px solid rgba(76, 175, 80, 0.1)',
              textAlign: 'center',
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
              🏆 Real-time updates • 📊 Complete activity tracking • ⚡ Instant notifications
            </Typography>
          </Box>
        </Fade>
      </Card>
    </Grow>
  );
}

export default ClaimHistory;
