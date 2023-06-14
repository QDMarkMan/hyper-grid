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
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useQuery, useResponsive } from 'pc/hooks';
// import { store } from 'pc/store';
import * as React from 'react';
import { useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ScreenSize } from 'pc/components/common/component_display';
// import { expandRecordIdNavigate } from 'pc/components/expand_record';
import { KonvaGridView } from 'pc/components/konva_grid';
import { GridViewContainer } from 'pc/components/multi_grid';
// import { GalleryView } from 'pc/components/gallery_view';
// import { GanttView } from 'pc/components/gantt_view';
// import { KanbanView } from 'pc/components/kanban_view';
// import { OrgChartView } from 'pc/components/org_chart_view';
// import { CalendarView } from 'pc/components/calendar_view';
// import { MobileGrid } from 'pc/components/mobile_grid';
// import { Toolbar } from 'pc/components/tool_bar';
import styles from './style.module.less';

export const DATASHEET_VIEW_CONTAINER_ID = 'DATASHEET_VIEW_CONTAINER_ID';
export const View: React.FC<React.PropsWithChildren<unknown>> = () => {
  // const { currentView, rows, linearRows } = useSelector((state: IReduxState) => {
  // const currentView = Selectors.getCurrentView(state)!;
  //   return {
  //     rows: Selectors.getVisibleRows(state),
  //     linearRows: Selectors.getLinearRows(state),
  //     currentView,
  //   };
  // }, shallowEqual);
  const [rows] = useState([]);
  const { screenIsAtMost } = useResponsive();
  const query = useQuery();
  const activeRecordId = query.get('activeRecordId');
  const isSideRecordOpen = true;
  const router = useRouter();

  useEffect(() => {
    if (!activeRecordId) {
      return;
    }
    // if (activeRecordId && rows.every(row => row.recordId !== activeRecordId)) {
    //   Message.warning({ content: t(Strings.active_record_hidden) });
    // } else {
    //   if (datasheetId && activeRecordId) {
    //     store.dispatch(
    //       StoreActions.setActiveCell(datasheetId, {
    //         recordId: activeRecordId,
    //         fieldId: views[0].columns[0].fieldId,
    //       }),
    //     );
    //     if (isSideRecordOpen) {
    //       expandRecordIdNavigate(activeRecordId);
    //     }
    //   }
    // }
    const urlObj = new URL(location.href);
    const searchParams = urlObj.searchParams;
    searchParams.delete('activeRecordId');
    router.replace(urlObj.pathname + urlObj.search);
  }, [rows, activeRecordId, isSideRecordOpen, router]);

  // useEffect(() => {
  //   if (!datasheetId || shareId || templateId || embedId) return;

  //   store.dispatch(StoreActions.getSubscriptionsAction(datasheetId, mirrorId));
  // }, [datasheetId, mirrorId, shareId, templateId, embedId]);

  // const useKonva = useMemo(() => {
  //   return true;
  // }, [currentView.id]);

  const useKonva = true;

  const isOrgChart = false;
  const isMobile = screenIsAtMost(ScreenSize.md);
  const isShowEmbedToolBar = false;
  const showTabBar = true;
  
  return (
    <div
      id={DATASHEET_VIEW_CONTAINER_ID}
      className={classNames(styles.gridView + ' layout-column f-g-1', {
        [styles.orgChart]: isOrgChart,
      })}
      style={{
        position: 'relative',
        padding: isMobile ? '0' : '',
        height: '100%',
        background: '',
        paddingLeft: isMobile || !isShowEmbedToolBar ? 0 : showTabBar ? '24px' : '32px'
      }}
    >
      {/* {isShowEmbedToolBar && <ComponentDisplay minWidthCompatible={ScreenSize.md}>
        <Toolbar />
      </ComponentDisplay> } */}
      <div style={{ flex: '1 1 auto', height: '100%', paddingTop: !isShowEmbedToolBar && showTabBar ? '16px' : '' }}>
        <AutoSizer className={classNames(styles.viewContainer, 'viewContainer')} style={{ width: '100%', height: '100%' }}>
          {/* {({ height, width }) => {
            switch (currentView.type) {
              case ViewType.Grid: {
                if (isMobile) {
                  return <MobileGrid width={width} height={height - 40} />;
                }
                return useKonva ? (
                  <KonvaGridView width={width} height={height} />
                ) : (
                  <GridViewContainer linearRows={linearRows} rows={rows} rowCount={linearRows?.length} height={height} width={width} />
                );
              }
              case ViewType.Gallery:
                return <GalleryView height={height} width={width} />;
              case ViewType.Calendar:
                return <CalendarView height={height} width={width} />;
              case ViewType.Kanban:
                return <KanbanView height={height} width={width} />;
              case ViewType.Gantt:
                return <GanttView width={width} height={height} />;
              case ViewType.OrgChart:
                return <OrgChartView width={width} height={height - (isMobile ? 40 : 0)} isMobile={isMobile} />;
              default:
                return <GridViewContainer linearRows={linearRows} rows={rows} rowCount={linearRows?.length} height={height} width={width} />;
            }
          }} */}

          {({ height, width }) => {
            return useKonva ? (
              <KonvaGridView width={width} height={height} />
            ) : (
              <GridViewContainer linearRows={[]} rows={rows} rowCount={0} height={height} width={width} />
            );
          }}
        </AutoSizer>
      </div>

      {/* <ContextMenu
        menuId={ConfigConstant.ContextMenuType.EXPAND_RECORD_FIELD}
        overlay={flatContextData(
          [
            [
              {
                icon: <EditOutlined color={colors.thirdLevelText} />,
                text: t(Strings.modify_field),
                hidden: ({ props }: any) => !props?.onEdit,
                onClick: ({ props }: any) => props?.onEdit && props.onEdit(),
              },
              {
                icon: <InfoCircleOutlined color={colors.thirdLevelText} />,
                text: t(Strings.editing_field_desc),
                onClick: ({ props }: any) => props?.onEditDesc && props.onEditDesc(),
              },
              {
                icon: <ArrowUpOutlined color={colors.thirdLevelText} />,
                text: t(Strings.insert_field_above),
                disabled: ({ props }: any) => !props.onInsertAbove,
                onClick: ({ props }: any) => props?.onInsertAbove && props.onInsertAbove(),
              },
              {
                icon: <ArrowDownOutlined color={colors.thirdLevelText} />,
                text: t(Strings.insert_field_below),
                onClick: ({ props }: any) => props?.onInsertBelow && props.onInsertBelow(),
              },
              {
                icon: <CopyOutlined color={colors.thirdLevelText} />,
                text: t(Strings.duplicate_field),
                hidden: ({ props }: any) => !props?.onCopyField,
                onClick: ({ props }: any) => props?.onCopyField && props.onCopyField(),
              },
              {
                icon: <EyeOpenOutlined color={colors.thirdLevelText} />,
                text: t(Strings.hide_fields),
                hidden: ({ props }: any) => !props?.onHiddenField,
                onClick: ({ props }: any) => props?.onHiddenField && props.onHiddenField(),
              },
              {
                icon: <DeleteOutlined color={colors.thirdLevelText} />,
                text: t(Strings.delete_field),
                hidden: ({ props }: any) => !props?.onDeleteField,
                onClick: ({ props }: any) => props?.onDeleteField && props.onDeleteField(),
              },
            ],
          ],
          true,
        )}
      /> */}
    </div>
  );
};
