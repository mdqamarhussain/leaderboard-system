import React, { useState, useEffect } from 'react';
import { claimPoints } from './api';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grow,
  Fade,
  Zoom,
  Chip,
  CircularProgress,
  Paper,
  Avatar,
  Slide,
  Collapse,
} from '@mui/material';
import {
  Casino as DiceIcon,
  Celebration as CelebrationIcon,
  Stars as StarsIcon,
  LocalFireDepartment as FireIcon,
  AutoAwesome as SparkleIcon,
  Bolt as BoltIcon,
  EmojiEvents as TrophyIcon,
  Whatshot as FlameIcon,
  Diamond as DiamondIcon,
} from '@mui/icons-material';

function ClaimPoints({ selectedUser, onClaimSuccess }) {
  const [awardedPoints, setAwardedPoints] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('idle');
  const [particles, setParticles] = useState([]);

  // Generate celebration particles
  const generateParticles = (points) => {
    const particleCount = points >= 8 ? 15 : points >= 5 ? 10 : 6;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 0.5,
      color: ['#ffd700', '#ff6b35', '#6366f1', '#ec4899', '#10b981'][Math.floor(Math.random() * 5)],
    }));
    setParticles(newParticles);
  };

  const handleClaim = async () => {
    if (!selectedUser) {
      alert('Please select a champion first!');
      return;
    }

    setLoading(true);
    setAwardedPoints(null);
    setShowCelebration(false);
    setShowExplosion(false);
    setAnimationPhase('rolling');
    
    try {
      const res = await claimPoints(selectedUser);
      const points = res.data.points;
      
      // Dramatic reveal sequence
      setTimeout(() => {
        setAwardedPoints(points);
        setAnimationPhase('revealing');
        generateParticles(points);
        setShowExplosion(true);
      }, 1500);
      
      setTimeout(() => {
        setShowCelebration(true);
        setAnimationPhase('celebrating');
        if (typeof onClaimSuccess === 'function') onClaimSuccess();
      }, 2000);
      
      // Reset after celebration
      setTimeout(() => {
        setShowCelebration(false);
        setShowExplosion(false);
        setAnimationPhase('idle');
        setParticles([]);
      }, 6000);
      
    } catch (error) {
      alert('Failed to claim points');
      setAnimationPhase('idle');
    }
    setLoading(false);
  };

  const getPointsMessage = (points) => {
    if (points >= 9) return "🔥 LEGENDARY ROLL! 🔥";
    if (points >= 7) return "⚡ EPIC SCORE! ⚡";
    if (points >= 5) return "✨ GREAT ROLL! ✨";
    if (points >= 3) return "🎯 NICE HIT! 🎯";
    return "🎲 LUCKY ROLL! 🎲";
  };

  const getPointsColor = (points) => {
    if (points >= 9) return '#ff1744';
    if (points >= 7) return '#ff6b35';
    if (points >= 5) return '#ffd700';
    if (points >= 3) return '#4caf50';
    return '#2196f3';
  };

  const ParticleExplosion = () => (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        borderRadius: 4,
      }}
    >
      {particles.map((particle) => (
        <Box
          key={particle.id}
          sx={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            borderRadius: '50%',
            animation: `explode 2s ease-out ${particle.delay}s forwards`,
            '@keyframes explode': {
              '0%': {
                transform: 'scale(0) rotate(0deg)',
                opacity: 1,
              },
              '50%': {
                transform: 'scale(1.5) rotate(180deg)',
                opacity: 0.8,
              },
              '100%': {
                transform: 'scale(0) rotate(360deg)',
                opacity: 0,
              },
            },
          }}
        />
      ))}
    </Box>
  );

  return (
    <Grow in timeout={700}>
      <Card sx={{ height: 'fit-content', position: 'relative', overflow: 'visible' }}>
        {/* Floating magic elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -15,
            left: -15,
            width: 50,
            height: 50,
            background: 'linear-gradient(135deg, #9c27b0, #ba68c8)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            animation: 'float 4s ease-in-out infinite',
            boxShadow: '0 6px 24px rgba(156, 39, 176, 0.4)',
          }}
        >
          <DiamondIcon sx={{ color: 'white', fontSize: 28 }} />
        </Box>

        {/* Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 50%, #ce93d8 100%)',
            backgroundSize: '200% 200%',
            animation: 'rainbow 8s ease infinite',
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
              background: 'radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
              pointerEvents: 'none',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
            <DiceIcon 
              sx={{ 
                fontSize: 40, 
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',
                animation: animationPhase === 'rolling' ? 'spin 0.5s linear infinite' : 'none',
              }} 
            />
          </Box>
          
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            🎲 Roll the Dice
          </Typography>
          
          <Typography variant="subtitle1" sx={{ opacity: 0.9, textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            Claim Your Fortune
          </Typography>
        </Box>
        
        <CardContent sx={{ p: 4, textAlign: 'center', position: 'relative', minHeight: 300 }}>
          {/* Particle explosion overlay */}
          {showExplosion && <ParticleExplosion />}
          
          {/* Instructions */}
          <Fade in timeout={800}>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4, 
                color: 'text.secondary',
                fontSize: '1.1rem',
                fontWeight: 500,
              }}
            >
              🎯 Click the dice to claim random points (1-10) for your selected champion
            </Typography>
          </Fade>
          
          {/* Main Claim Button */}
          <Zoom in timeout={1000}>
            <Box sx={{ mb: 4 }}>
              <Button
                onClick={handleClaim}
                disabled={loading || !selectedUser}
                variant="contained"
                size="large"
                startIcon={
                  loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <DiceIcon sx={{ fontSize: 28 }} />
                  )
                }
                sx={{
                  background: 'linear-gradient(135deg, #ff6b35 0%, #ff8a65 50%, #ffab91 100%)',
                  fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.4rem' }, 
                    py: { xs: 2, sm: 2.5 },
                    px: { xs: 3, sm: 4, md: 5 },
                  borderRadius: 4,
                    minWidth: { xs: '100%', sm: 250 },
                    minHeight: { xs: '56px', sm: '64px', md: '70px' },
                  height: 70,
                  boxShadow: '0 8px 32px rgba(255, 107, 53, 0.5)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                    transition: 'left 0.6s ease',
                  },
                  '&:hover': {
                    background: 'linear-gradient(135deg, #e64a19 0%, #ff6b35 50%, #ff8a65 100%)',
                    transform: 'translateY(-4px) scale(1.05)',
                    boxShadow: '0 12px 40px rgba(255, 107, 53, 0.7)',
                    '&::before': {
                      left: '100%',
                    },
                  },
                  '&:active': {
                    transform: 'translateY(-2px) scale(1.02)',
                  },
                  '&:disabled': {
                    background: '#ccc',
                    transform: 'none',
                    boxShadow: 'none',
                  },
                }}
              >
                {loading ? 'Rolling the Dice...' : '🎲 ROLL FOR GLORY! 🎲'}
              </Button>
            </Box>
          </Zoom>

          {/* Rolling Animation */}
          <Collapse in={animationPhase === 'rolling'}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      animation: `bounce 1s infinite ${i * 0.1}s`,
                      '@keyframes bounce': {
                        '0%, 100%': { transform: 'translateY(0)' },
                        '50%': { transform: 'translateY(-20px)' },
                      },
                    }}
                  />
                ))}
              </Box>
              <Typography variant="h6" sx={{ color: '#6366f1', fontWeight: 600 }}>
                🎲 The dice are rolling...
              </Typography>
            </Box>
          </Collapse>

          {/* Results Display */}
          {awardedPoints !== null && (
            <Zoom in timeout={500}>
              <Paper
                elevation={8}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: `linear-gradient(135deg, ${getPointsColor(awardedPoints)}20 0%, ${getPointsColor(awardedPoints)}10 100%)`,
                  border: `2px solid ${getPointsColor(awardedPoints)}`,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, transparent, ${getPointsColor(awardedPoints)}, transparent)`,
                  },
                }}
              >
                <Typography 
                  variant="h4" 
                  sx={{ 
                    mb: 2, 
                    fontWeight: 'bold', 
                    color: getPointsColor(awardedPoints),
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  {getPointsMessage(awardedPoints)}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      background: `linear-gradient(135deg, ${getPointsColor(awardedPoints)}, ${getPointsColor(awardedPoints)}80)`,
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      animation: showCelebration ? 'pulse 1s infinite' : 'none',
                      boxShadow: `0 8px 32px ${getPointsColor(awardedPoints)}40`,
                    }}
                  >
                    {awardedPoints}
                  </Avatar>
                </Box>
                
                <Chip
                  icon={<StarsIcon />}
                  label={`+${awardedPoints} Points Awarded!`}
                  sx={{
                    fontSize: '1.3rem',
                    height: 50,
                    px: 3,
                    fontWeight: 'bold',
                    background: `linear-gradient(135deg, ${getPointsColor(awardedPoints)}, ${getPointsColor(awardedPoints)}cc)`,
                    color: 'white',
                    boxShadow: `0 4px 20px ${getPointsColor(awardedPoints)}40`,
                    animation: showCelebration ? 'glow 2s infinite' : 'none',
                  }}
                />
              </Paper>
            </Zoom>
          )}

          {/* Celebration Effects */}
          {showCelebration && (
            <Fade in timeout={300}>
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                  <CelebrationIcon sx={{ fontSize: 40, color: '#ffd700', animation: 'pulse 1s infinite' }} />
                  <TrophyIcon sx={{ fontSize: 40, color: '#ff6b35', animation: 'pulse 1s infinite 0.2s' }} />
                  <FireIcon sx={{ fontSize: 40, color: '#ff1744', animation: 'pulse 1s infinite 0.4s' }} />
                  <FlameIcon sx={{ fontSize: 40, color: '#ff9800', animation: 'pulse 1s infinite 0.6s' }} />
                  <SparkleIcon sx={{ fontSize: 40, color: '#6366f1', animation: 'pulse 1s infinite 0.8s' }} />
                </Box>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'text.secondary',
                    fontWeight: 500,
                    animation: 'slideInUp 0.5s ease-out',
                  }}
                >
                  🏆 The leaderboard has been updated! 🏆
                </Typography>
              </Box>
            </Fade>
          )}

          {/* Status Message */}
          {!selectedUser && (
            <Fade in timeout={1200}>
              <Paper
                sx={{
                  p: 2,
                  mt: 3,
                  background: 'rgba(255, 193, 7, 0.1)',
                  border: '1px solid rgba(255, 193, 7, 0.3)',
                  borderRadius: 3,
                }}
              >
                <Typography variant="body2" color="warning.main" fontWeight="500">
                  ⚠️ Please select a champion from the Player Hub to start rolling!
                </Typography>
              </Paper>
            </Fade>
          )}
        </CardContent>
      </Card>
    </Grow>
  );
}

// Add additional keyframes
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes slideInUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;
document.head.appendChild(additionalStyles);

export default ClaimPoints;
