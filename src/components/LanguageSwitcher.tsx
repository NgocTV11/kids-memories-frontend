'use client';

import { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import { useI18nStore } from '@/store/i18n.store';
import { locales, localeNames, localeFlags, Locale } from '@/config/i18n.config';

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18nStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    handleClose();
  };

  return (
    <>
      <Tooltip title={t.changeLanguage}>
        <IconButton
          onClick={handleClick}
          size="large"
          aria-label="change language"
          aria-controls={open ? 'language-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={{
            color: 'inherit',
          }}
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {locales.map((loc) => (
          <MenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            selected={locale === loc}
            sx={{
              minWidth: 180,
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              },
            }}
          >
            <ListItemIcon sx={{ fontSize: 24 }}>
              {localeFlags[loc]}
            </ListItemIcon>
            <ListItemText
              primary={localeNames[loc]}
              primaryTypographyProps={{
                fontWeight: locale === loc ? 600 : 400,
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
