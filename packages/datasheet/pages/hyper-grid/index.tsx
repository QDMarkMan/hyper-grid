/** ---------------------------------------------------------------------------------------------
 *  @Author [Tongfu.E].
 *  @Date [2023-04-07 10:59:40].
 *  @Des [ Hyper Grid 测试页面].
 *-------------------------------------------------------------------------------------------- */

import { SystemConfig } from '@apitable/core';
import { DatasheetMain } from 'pc/components/datasheet_panel';
import { getStorage, setStorage, StorageMethod, StorageName } from 'pc/utils/storage/storage';
import React, { FC, useMemo } from 'react';

const HyperGrid: FC<React.PropsWithChildren<unknown>> = () => {

  const testFunctions = useMemo(() => {
    const funcs = getStorage(StorageName.TestFunctions) || {};
    return Object.keys(funcs)
      .filter(k => ![SystemConfig.test_function.render_prompt.feature_key, 'canvas'].includes(k))
      .map(k => funcs[k])
      .join(' , ');
  }, []);

  const handleExitTest = () => {
    setStorage(StorageName.TestFunctions, {}, StorageMethod.Set);
    window.location.reload();
  };

  return (<div>
    Data Sheet
    <DatasheetMain
      loading={false}
      datasheetErrorCode={-1}
      isNoPermission={false}
      preview={false}
      testFunctions={testFunctions}
      handleExitTest={handleExitTest}
    />
  </div>);
};

export default HyperGrid;
