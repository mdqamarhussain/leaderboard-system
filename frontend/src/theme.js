import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1', // Indigo
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f59e0b', // Amber
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#ffffff',
    },
    tertiary: {
      main: '#ec4899', // Pink
      light: '#f472b6',
      dark: '#db2777',
      contrastText: '#ffffff',
    },
    success: {
      main: '#10b981', // Emerald
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
      contrastText: '#ffffff',
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      cardGradient: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
      disabled: '#94a3b8',
    },
    divider: '#e2e8f0',
    // Custom color palette for rankings
    ranking: {
      gold: '#ffd700',
      silver: '#c0c0c0',
      bronze: '#cd7f32',
      diamond: '#b9f2ff',
      platinum: '#e5e4e2',
    },
    // Gradient definitions
    gradients: {
      primary: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
      secondary: 'linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ef4444 100%)',
      success: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
      royal: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      sunset: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)',
      ocean: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fire: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff1744 100%)',
      nature: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      cosmic: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      aurora: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    },
  },
typography: {
  fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
  h1: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)', // 👈 CHANGE THIS LINE
    fontWeight: 800,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  h2: {
    fontSize: 'clamp(1.75rem, 4vw, 3rem)', // 👈 CHANGE THIS LINE
    fontWeight: 700,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', // 👈 CHANGE THIS LINE
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h4: {
    fontSize: 'clamp(1.25rem, 3vw, 2rem)', // 👈 CHANGE THIS LINE
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', // 👈 CHANGE THIS LINE
    fontWeight: 500,
    lineHeight: 1.5,
  },
  h6: {
    fontSize: 'clamp(1rem, 2vw, 1.25rem)', // 👈 CHANGE THIS LINE
    fontWeight: 500,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', // 👈 CHANGE THIS LINE
    fontWeight: 400,
    lineHeight: 1.6,
  },
  body2: {
    fontSize: 'clamp(0.75rem, 1.25vw, 0.875rem)', // 👈 CHANGE THIS LINE
    fontWeight: 400,
    lineHeight: 1.6,
  },
  button: {
    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', // 👈 CHANGE THIS LINE
    fontWeight: 600,
    lineHeight: 1.5,
    textTransform: 'none',
  },
},

  spacing: 8,
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
    '0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)',
    '0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)',
    '0px 14px 28px rgba(0, 0, 0, 0.25), 0px 10px 10px rgba(0, 0, 0, 0.22)',
    '0px 19px 38px rgba(0, 0, 0, 0.30), 0px 15px 12px rgba(0, 0, 0, 0.22)',
    '0px 24px 48px rgba(0, 0, 0, 0.35), 0px 19px 19px rgba(0, 0, 0, 0.22)',
    '0px 32px 64px rgba(0, 0, 0, 0.40), 0px 24px 24px rgba(0, 0, 0, 0.22)',
    '0px 40px 80px rgba(0, 0, 0, 0.45), 0px 32px 32px rgba(0, 0, 0, 0.22)',
    // Premium glass-morphism shadows
    '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    '0 12px 40px 0 rgba(31, 38, 135, 0.4)',
    '0 16px 48px 0 rgba(31, 38, 135, 0.43)',
    '0 20px 56px 0 rgba(31, 38, 135, 0.46)',
    '0 24px 64px 0 rgba(31, 38, 135, 0.49)',
    '0 28px 72px 0 rgba(31, 38, 135, 0.52)',
    '0 32px 80px 0 rgba(31, 38, 135, 0.55)',
    '0 36px 88px 0 rgba(31, 38, 135, 0.58)',
    '0 40px 96px 0 rgba(31, 38, 135, 0.61)',
    '0 44px 104px 0 rgba(31, 38, 135, 0.64)',
    '0 48px 112px 0 rgba(31, 38, 135, 0.67)',
    '0 52px 120px 0 rgba(31, 38, 135, 0.70)',
    '0 56px 128px 0 rgba(31, 38, 135, 0.73)',
    '0 60px 136px 0 rgba(31, 38, 135, 0.76)',
    '0 64px 144px 0 rgba(31, 38, 135, 0.79)',
    '0 68px 152px 0 rgba(31, 38, 135, 0.82)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundAttachment: 'fixed',
          fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
          fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
          fontVariationSettings: '"opsz" 32',
        },
        // Custom scrollbar
        '::-webkit-scrollbar': {
          width: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          backdropFilter: 'blur(20px)',
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
          },
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 20px 60px 0 rgba(31, 38, 135, 0.5)',
            background: 'rgba(255, 255, 255, 0.98)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          padding: '12px 32px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
            transition: 'left 0.6s ease',
          },
          '&:hover::before': {
            left: '100%',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)',
            boxShadow: '0 12px 40px rgba(99, 102, 241, 0.6)',
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          },
        },
        outlined: {
          borderWidth: '2px',
          borderImage: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899) 1',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            background: 'rgba(99, 102, 241, 0.1)',
            borderImage: 'linear-gradient(135deg, #4f46e5, #7c3aed, #db2777) 1',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 600,
          fontSize: '0.875rem',
          height: 36,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
        colorPrimary: {
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          },
        },
        colorSecondary: {
          background: 'linear-gradient(135deg, #f59e0b, #f97316)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(135deg, #d97706, #ea580c)',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: '1.2rem',
          border: '3px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          '& .MuiTableCell-head': {
            color: 'white',
            fontWeight: 700,
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: 'rgba(99, 102, 241, 0.05)',
            transform: 'scale(1.01)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
          padding: '16px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.95)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)',
            },
            '&.Mui-focused': {
              background: 'rgba(255, 255, 255, 1)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.95)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)',
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: 16,
          padding: 0,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: '4px 8px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: 'rgba(99, 102, 241, 0.1)',
            transform: 'translateX(8px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiAlert-root': {
            borderRadius: 16,
            backdropFilter: 'blur(20px)',
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          borderRadius: '50%',
          padding: '4px',
        },
      },
    },
  },
  // Custom animations
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
});

// Add custom keyframes for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes shimmer {
    0% { background-position: -200px 0; }
    100% { background-position: calc(200px + 100%) 0; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
    50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.8); }
  }
  
  @keyframes slideInUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes rainbow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;
document.head.appendChild(style);

export default theme;
