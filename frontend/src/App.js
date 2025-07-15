import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { 
  Container, 
  Box, 
  Typography, 
  Fade, 
  Zoom,
  Slide,
  Paper,
  IconButton,
  Tooltip,
  Fab,
  useScrollTrigger,
  Collapse
} from '@mui/material';
import { 
  KeyboardArrowUp as ScrollTopIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  AutoAwesome as SparkleIcon,
  EmojiEvents as TrophyIcon,
  Celebration as CelebrationIcon
} from '@mui/icons-material';
import { theme } from './theme';
import Leaderboard from './Leaderboard';
import UserSelector from './UserSelector';
import ClaimPoints from './ClaimPoints';
import ClaimHistory from './ClaimHistory';

// Floating particles background component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => (
    <Box
      key={i}
      sx={{
        position: 'absolute',
        width: Math.random() * 6 + 2,
        height: Math.random() * 6 + 2,
        background: `linear-gradient(45deg, 
          ${['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'][Math.floor(Math.random() * 5)]}, 
          ${['#4f46e5', '#7c3aed', '#db2777', '#d97706', '#059669'][Math.floor(Math.random() * 5)]}
        )`,
        borderRadius: '50%',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 2}s`,
        opacity: 0.6,
        filter: 'blur(1px)',
      }}
    />
  ));
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        overflow: 'hidden',
      }}
    >
      {particles}
    </Box>
  );
};

// Scroll to top button
const ScrollToTop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        onClick={handleClick}
        color="primary"
        size="medium"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
          zIndex: 1000,
          '&:hover': {
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            transform: 'scale(1.1)',
            boxShadow: '0 12px 40px rgba(99, 102, 241, 0.6)',
          },
        }}
      >
        <ScrollTopIcon />
      </Fab>
    </Zoom>
  );
};

// Animated header component
const AnimatedHeader = ({ showCelebration }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        textAlign: 'center',
        mb: 6,
        py: 4,
      }}
    >
      <Fade in timeout={1000}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
            <SparkleIcon 
              sx={{ 
                fontSize: 40, 
                color: '#ffd700', 
                mr: 2,
                animation: 'pulse 2s infinite',
              }} 
            />
            <TrophyIcon 
              sx={{ 
                fontSize: 60, 
                color: '#ffd700',
                animation: 'glow 3s infinite',
              }} 
            />
            <SparkleIcon 
              sx={{ 
                fontSize: 40, 
                color: '#ffd700', 
                ml: 2,
                animation: 'pulse 2s infinite 0.5s',
              }} 
            />
          </Box>
          
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 900,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 25%, #ec4899 50%, #f59e0b 75%, #10b981 100%)',
              backgroundSize: '200% 200%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'rainbow 4s ease infinite',
              textShadow: '0 0 30px rgba(99, 102, 241, 0.5)',
              mb: 2,
            }}
          >
            Ultimate Leaderboard
          </Typography>
          
          <Typography
            variant="h4"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 600,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 1,
            }}
          >
            Championship Arena
          </Typography>
          
          <Typography
            variant="subtitle1"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 400,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Where legends are born and champions rise to glory
          </Typography>
        </Box>
      </Fade>
      
      <Collapse in={showCelebration}>
        <Box sx={{ mt: 2 }}>
          <CelebrationIcon 
            sx={{ 
              fontSize: 50, 
              color: '#ffd700',
              animation: 'pulse 1s infinite',
            }} 
          />
        </Box>
      </Collapse>
    </Box>
  );
};

// Main App component
function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const triggerRefresh = () => {
    setRefresh(r => !r);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FloatingParticles />
      
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          backgroundSize: '400% 400%',
          animation: 'rainbow 15s ease infinite',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ py: 4 }}>
            <AnimatedHeader showCelebration={showCelebration} />
            
            {/* Control Panel */}
            <Slide direction="up" in timeout={800}>
              <Paper
                elevation={10}
                sx={{
                  p: 3,
                  mb: 4,
                  borderRadius: 6,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 600,
                    mb: 3,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  }}
                >
                  🎮 Game Control Center
                </Typography>
                
<Box
  sx={{
    display: 'grid',
    gridTemplateColumns: { 
      xs: '1fr', 
      sm: '1fr', 
      md: '1fr 1fr',
      lg: '1fr 1fr'
    },
    gap: { xs: 2, sm: 2.5, md: 3 },
  }}
>

                  <Zoom in timeout={1000}>
                    <Box>
                      <UserSelector
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                        refreshUsers={triggerRefresh}
                      />
                    </Box>
                  </Zoom>
                  
                  <Zoom in timeout={1200}>
                    <Box>
                      <ClaimPoints
                        selectedUser={selectedUser}
                        onClaimSuccess={triggerRefresh}
                      />
                    </Box>
                  </Zoom>
                </Box>
              </Paper>
            </Slide>
            
            {/* Main Content Area */}
<Box
  sx={{
    display: 'grid',
    gridTemplateColumns: { 
      xs: '1fr', 
      sm: '1fr',
      md: '1fr',
      lg: '2fr 1fr',
      xl: '2.5fr 1fr'
    },
    gap: { xs: 3, sm: 3, md: 4 },
  }}
>

              <Slide direction="right" in timeout={1000}>
                <Box>
                  <Leaderboard key={refresh} />
                </Box>
              </Slide>
              
              <Slide direction="left" in timeout={1200}>
                <Box>
                  <ClaimHistory refreshFlag={refresh} />
                </Box>
              </Slide>
            </Box>
            
            {/* Footer */}
            <Fade in timeout={2000}>
              <Box
                sx={{
                  mt: 8,
                  py: 4,
                  textAlign: 'center',
                  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontWeight: 500,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  }}
                >
                  ✨ Built with passion for excellence ✨
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    display: 'block',
                    mt: 1,
                  }}
                >
                  Real-time leaderboard system with premium UI/UX
                </Typography>
              </Box>
            </Fade>
          </Box>
        </Container>
      </Box>
      
      <ScrollToTop />
    </ThemeProvider>
  );
}

export default App;
