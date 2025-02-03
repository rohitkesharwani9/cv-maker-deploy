import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { SideDrawer } from 'src/core/widgets/SideDrawer';
import { Templates } from 'src/core/components/templates/Templates';
import { Themes } from 'src/core/components/themes/Themes';
import { SideMenu } from 'src/core/widgets/SideMenu';
import { PrintSettings } from 'src/core/widgets/PrintSettings';
import { useZoom } from 'src/stores/settings.store';
import { getIcon } from 'src/styles/icons';
import { SaveSettings } from '../widgets/SaveSettings';
import { UploadSettings } from '../widgets/UploadSettings';
import { useActivities, useEducation, useIntro, useSkills, useWork } from 'src/stores/data.store';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;
  margin-top: 33px;

  @media print {
    display: none;
  }
`;

const sideBarList = [
  {
    key: 0,
    title: 'Template',
    icon: 'template',
    component: <Templates />,
  },
  {
    key: 1,
    title: 'Theme',
    icon: 'color',
    component: <Themes />,
  },
];

const IconWrapper = styled.div`
  position: relative;
  outline-color: transparent;
  margin-bottom: 1rem;

  &:hover .tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateY(-50%) translateX(-15px); /* Move slightly left */
  }
`;

const Tooltip = styled.span`
  position: absolute;
  top: 50%;
  right: 100%; /* Move to the left */
  transform: translateY(-50%) translateX(-10px); /* Adjust positioning */
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, transform 0.3s ease;

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 100%; /* Adjust for left-side tooltip */
    transform: translateY(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent rgba(0, 0, 0, 0.8); /* Arrow on right */
  }
`;

const IconButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 40px;
  background: transparent;
  border: 0;
  border-radius: 2px;
  padding: 0;
  color: rgb(230, 230, 230);
`;

export const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(-1);
  const zoom = useZoom((state: any) => state.zoom);
  const updateZoom = useZoom((state: any) => state.update);

  const resetBasics = useIntro((state: any) => state.reset);
  const resetSkills = useSkills((state: any) => state.reset);
  const resetWork = useWork((state: any) => state.reset);
  const resetEducation = useEducation((state: any) => state.reset);
  const resetActivities = useActivities((state: any) => state.reset);

  const clickHandler = useCallback(
    (event: any) => {
      if (activeTab === event.currentTarget.dataset.id) setActiveTab(-1);
      else setActiveTab(event.currentTarget.dataset.id);
    },
    [activeTab, setActiveTab]
  );

  const zoomout = useCallback(() => {
    updateZoom(zoom - 0.1);
  }, [zoom, updateZoom]);

  const zoomin = useCallback(() => {
    updateZoom(zoom + 0.1);
  }, [zoom, updateZoom]);

  const reset = () => {
    resetBasics();
    resetSkills();
    resetWork();
    resetEducation();
    resetActivities();
  };

  return (
    <Wrapper>
      <SideDrawer isShown={activeTab !== -1}>{sideBarList[activeTab]?.component}</SideDrawer>
      <SideMenu menuList={sideBarList} onClick={clickHandler}>
        <IconWrapper>
          <IconButton onClick={zoomout}>{getIcon('zoomout')}</IconButton>
          <Tooltip className="tooltip">Zoom Out</Tooltip>
        </IconWrapper>

        <IconWrapper>
          <IconButton onClick={zoomin}>{getIcon('zoomin')}</IconButton>
          <Tooltip className="tooltip">Zoom In</Tooltip>
        </IconWrapper>

        <IconWrapper>
          <IconButton onClick={reset}>{getIcon('reset')}</IconButton>
          <Tooltip className="tooltip">Reset All</Tooltip>
        </IconWrapper>

        <IconWrapper>
          <UploadSettings />
          <Tooltip className="tooltip">Import JSON File To Edit an old CV</Tooltip>
        </IconWrapper>

        <IconWrapper>
          <SaveSettings />
          <Tooltip className="tooltip">Export As JSON Format To Reuse in The Future</Tooltip>
        </IconWrapper>

        <IconWrapper>
          <PrintSettings />
          <Tooltip className="tooltip">Print/Save As PDF</Tooltip>
        </IconWrapper>
      </SideMenu>
    </Wrapper>
  );
};
