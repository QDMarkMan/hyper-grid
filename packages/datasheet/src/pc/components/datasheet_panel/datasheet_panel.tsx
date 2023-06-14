/**
 * APITable <https://github.com/apitable/apitable>
 * Copyright (C) 2022 APITable Ltd. <https://apitable.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Skeleton } from '@apitable/components';
import { Events, Player, PREVIEW_DATASHEET_ID, ResourceType, StoreActions, SystemConfig } from '@apitable/core';
import { useToggle } from 'ahooks';
import classNames from 'classnames';
// @ts-ignore
import { ShortcutActionManager, ShortcutActionName } from 'modules/shared/shortcut_key';
import dynamic from 'next/dynamic';
import { ApiPanel } from 'pc/components/api_panel';
import { VikaSplitPanel } from 'pc/components/common';
import { TimeMachine } from 'pc/components/time_machine';
import { useMountWidgetPanelShortKeys } from 'pc/components/widget/hooks';
import { SideBarClickType, SideBarType, useSideBar } from 'pc/context';
import { useResponsive } from 'pc/hooks';
import { useAppDispatch } from 'pc/hooks/use_app_dispatch';
import { store } from 'pc/store';
import { getStorage, setStorage, StorageMethod, StorageName } from 'pc/utils/storage/storage';
import * as React from 'react';
import { FC, useCallback, useEffect, useMemo } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ComponentDisplay, ScreenSize } from '../common/component_display';
import { DevToolsPanel } from '../development/dev_tools_panel';
import { closeAllExpandRecord } from '../expand_record';
import { ExpandRecordPanel } from '../expand_record_panel';
import { TabBar } from '../tab_bar';
import { ViewContainerBase } from './view_container';
import { WidgetPanel } from '../widget';
import styles from './style.module.less';

const RobotPanel = dynamic(() => import('pc/components/robot/robot_panel/robot_panel'), {
  ssr: false,
  loading: () => (
    <div className={styles.loading}>
      <Skeleton count={1} width='38%' />
      <Skeleton count={2} />
      <Skeleton count={1} width='61%' />
    </div>
  ),
});

interface IDatasheetMain {
  loading: boolean;
  datasheetErrorCode?: number | null;
  isNoPermission: boolean;
  shareId?: string;
  datasheetId?: string;
  preview?: any;
  testFunctions: any;
  handleExitTest: any;
  mirrorId?: string;
  embedId?: string;
}

export const DatasheetMain = (props: IDatasheetMain) => {
  const { loading } = props;
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div className={classNames(styles.dataspaceRight, 'dataspaceRight', loading && styles.loading)} style={{ height: '100%' }}>
        <ComponentDisplay minWidthCompatible={ScreenSize.md}>
          <TabBar loading={loading}/>
        </ComponentDisplay>
        <ViewContainerBase loading={loading} />
      </div>
    </div>
  );
};

const DefaultPanelWidth = {
  Empty: 0,
  DevTool: 320,
  TimeMachine: 320,
  Api: '50%',
  Robot: 320,
  SideRecord: 450,
} as const;

const DISABLED_CLOSE_SIDEBAR_WIDTH = 1920;

const DataSheetPanelBase: FC<React.PropsWithChildren<{ panelLeft?: JSX.Element }>> = props => {
  const isShareMode = false;
  const { isMobile } = useResponsive();
  const rightPanelWidth = '100%';
  const loading = false;
  const activeDatasheetId = '1';
  const dispatch = useAppDispatch();
  const testFunctions = useMemo(() => {
    const funcs = getStorage(StorageName.TestFunctions) || {};
    return Object.keys(funcs)
      .filter(k => ![SystemConfig.test_function.render_prompt.feature_key, 'canvas'].includes(k))
      .map(k => funcs[k])
      .join(' , ');
  }, []);

  const isApiPanelOpen = true;
  const isSideRecordOpen = false;
  const isTimeMachinePanelOpen = false;

  useMountWidgetPanelShortKeys();

  const [isDevToolsOpen, { toggle: toggleDevToolsOpen, set: setDevToolsOpen }] = useToggle();
  const [isRobotPanelOpen, { toggle: toggleRobotPanelOpen, set: setRobotPanelOpen }] = useToggle();
  const toggleTimeMachineOpen = useCallback(
    (state?: boolean) => {
      if (activeDatasheetId) {
        dispatch(StoreActions.toggleTimeMachinePanel(activeDatasheetId, state));
      }
    },
    [dispatch, activeDatasheetId],
  );
  const { onSetSideBarVisibleByOhter, onSetPanelVisible, toggleType, clickType, sideBarVisible } = useSideBar();

  // TODO: Unified control logic for right sidebar expand/collapse states
  useEffect(() => {
    if (isApiPanelOpen) {
      dispatch(StoreActions.toggleSideRecord(false));
      closeAllExpandRecord(); // async
    }
  }, [dispatch, isApiPanelOpen]);

  useEffect(() => {
    if (isSideRecordOpen) {
      dispatch(StoreActions.toggleApiPanel(false));
    } else {
      window.dispatchEvent(new Event('resize')); // Trigger the width response of the component panel
    }
  }, [dispatch, isSideRecordOpen]);

  useEffect(() => {
    ShortcutActionManager.bind(ShortcutActionName.ToggleDevPanel, toggleDevToolsOpen);
  }, [toggleDevToolsOpen]);

  useEffect(() => {
    ShortcutActionManager.bind(ShortcutActionName.ToggleRobotPanel, toggleRobotPanelOpen);
  }, [toggleRobotPanelOpen]);

  useEffect(() => {
    ShortcutActionManager.bind(ShortcutActionName.ToggleTimeMachinePanel, toggleTimeMachineOpen);
  }, [toggleTimeMachineOpen]);

  useEffect(() => {
    if (!activeDatasheetId) {
      return;
    }
    dispatch(StoreActions.setRobotPanelStatus(isRobotPanelOpen, activeDatasheetId));
  }, [isRobotPanelOpen, dispatch, activeDatasheetId]);

  useEffect(() => {
    setDevToolsOpen(false);
    setRobotPanelOpen(false);
    toggleTimeMachineOpen(false);

    dispatch(StoreActions.resetDatasheet(PREVIEW_DATASHEET_ID));
    // eslint-disable-next-line
  }, [activeDatasheetId]);

  useEffect(() => {
    if (!isTimeMachinePanelOpen) {
      dispatch(StoreActions.resetDatasheet(PREVIEW_DATASHEET_ID));
    }
    // eslint-disable-next-line
  }, [isTimeMachinePanelOpen]);

  const isNoPermission = false;
  const shareStyle: React.CSSProperties = {
    overflow: 'hidden',
    borderRadius: '8px',
    height: '100%',
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    Player.doTrigger(Events.datasheet_shown);
  }, [loading]);

  useEffect(() => {
    if (isApiPanelOpen || isSideRecordOpen) {
      setRobotPanelOpen(false);
    }
  }, [isApiPanelOpen, setRobotPanelOpen, isSideRecordOpen, dispatch]);

  const paneSizeChange = (newSize: number) => {
    const widgetPanelStatusMap = getStorage(StorageName.WidgetPanelStatusMap);
    dispatch(StoreActions.setRightPaneWidth(newSize));

    if (widgetPanelStatusMap && !isRobotPanelOpen && !isSideRecordOpen) {
      const state = store.getState();
      const spaceId = state.space.activeId;
      const { datasheetId, mirrorId } = state.pageParams;
      const resourceId = mirrorId || datasheetId;
      const resourceType = mirrorId ? ResourceType.Mirror : ResourceType.Datasheet;

      const status = widgetPanelStatusMap[`${spaceId},${resourceId}`];
      dispatch(StoreActions.changeWidgetPanelWidth(newSize, resourceId!, resourceType));
      setStorage(StorageName.WidgetPanelStatusMap, {
        [`${spaceId},${resourceId}`]: {
          width: newSize,
          opening: true,
          activePanelId: status?.activePanelId,
        },
      });
    }

    if (isSideRecordOpen) {
      setStorage(StorageName.SideRecordWidth, newSize, StorageMethod.Set);
    }

    window.dispatchEvent(new Event('resize'));
  };

  const handleExitTest = () => {
    setStorage(StorageName.TestFunctions, {}, StorageMethod.Set);
    window.location.reload();
  };

  const panelSize = (() => {
    if (isMobile || isNoPermission) {
      return DefaultPanelWidth.Empty;
    }
    if (isDevToolsOpen) {
      return DefaultPanelWidth.DevTool;
    }
    if (isTimeMachinePanelOpen) {
      return DefaultPanelWidth.TimeMachine;
    }
    if (isApiPanelOpen) {
      return DefaultPanelWidth.Api;
    }
    if (isRobotPanelOpen) {
      return DefaultPanelWidth.Robot;
    }
    if (isSideRecordOpen) {
      const width = getStorage(StorageName.SideRecordWidth);

      return width && width < window.innerWidth && width > DefaultPanelWidth.SideRecord ? width : DefaultPanelWidth.SideRecord;
    }
    return DefaultPanelWidth.Empty;
  })();

  useEffect(() => {
    dispatch(StoreActions.setRightPaneWidth(panelSize));
  }, [dispatch, panelSize]);

  useEffect(() => {
    const panelVisible = Boolean(panelSize);
    onSetPanelVisible && onSetPanelVisible(panelVisible);

    if (
      !onSetSideBarVisibleByOhter ||
      toggleType === SideBarType.User ||
      clickType === SideBarClickType.FindInput ||
      window.innerWidth > DISABLED_CLOSE_SIDEBAR_WIDTH
    ) {
      return;
    }

    // if (clickType === SideBarClickType.ToolBar) {
    //   const contentWidth = getContentWidth(sideBarVisible);
    //   if (rightPanelWidth < contentWidth / 2) {
    //     if (rightPanelWidth === 0) {
    //       onSetSideBarVisibleByOhter(true);
    //     }
    //     return;
    //   }
    //   onSetSideBarVisibleByOhter(!panelVisible);
    // }
  }, [panelSize, sideBarVisible, rightPanelWidth, onSetSideBarVisibleByOhter, onSetPanelVisible, toggleType, clickType]);

  const datasheetMain = props.panelLeft || (
    <DatasheetMain
      loading={loading}
      datasheetErrorCode={-1}
      isNoPermission={isNoPermission}
      shareId={''}
      datasheetId={''}
      mirrorId={''}
      preview={'11111'}
      testFunctions={testFunctions}
      handleExitTest={handleExitTest}
      embedId={''}
    />
  );

  const childComponent = (
    <AutoSizer style={{ width: '100%', height: '100%' }}>
      {({ width }) =>
        panelSize ? (
          <VikaSplitPanel
            panelLeft={datasheetMain}
            panelRight={
              <div style={{ width: '100%', height: '100%' }}>
                {isSideRecordOpen && <ExpandRecordPanel />}
                <WidgetPanel />
                {!isShareMode && <ApiPanel />}
                {isDevToolsOpen && <DevToolsPanel onClose={setDevToolsOpen} />}
                {isRobotPanelOpen && <RobotPanel />}
                {isTimeMachinePanelOpen && <TimeMachine onClose={toggleTimeMachineOpen} />}
              </div>
            }
            primary='second'
            split='vertical'
            minSize={isSideRecordOpen ? 450 : 320}
            maxSize={width / 2}
            onChange={paneSizeChange}
            size={panelSize}
            style={isShareMode ? shareStyle : {}}
            allowResize={isApiPanelOpen ? false : Boolean(panelSize)}
            pane1Style={{ overflow: 'hidden' }}
            className='contentSplitPanel'
          />
        ) : (
          datasheetMain
        )
      }
    </AutoSizer>
  );

  return childComponent;
};

export const DataSheetPanel = React.memo(DataSheetPanelBase);
