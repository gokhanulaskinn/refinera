import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

type TabPanelProps = {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  tabs: string[];
};

export default function BasicTabs({ value, handleChange, tabs }: TabPanelProps) {

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab}
              sx={{
                textTransform: 'none',
              }}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}
