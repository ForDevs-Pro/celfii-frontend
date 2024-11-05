import * as React from "react";
import { useCallback } from "react";
import DownloadIcon from "@mui/icons-material/GetApp";
import { fetchRelatedRecords, useDataProvider, useNotify, useListContext } from "ra-core";
import { Button, ButtonProps } from "../../../../node_modules/react-admin/node_modules/ra-ui-materialui/src/button/Button";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const ExportButton = (props: ExportButtonProps) => {
  const {
    maxResults = 1000,
    onClick,
    label = "ra.action.export",
    icon = defaultIcon,
    meta,
    ...rest
  } = props;
  const { filter, filterValues, resource, sort, total } = useListContext();
  const dataProvider = useDataProvider();
  const notify = useNotify();

  const exportToExcel = (
    data: any[],
    fetchRelatedRecords: any,
    dataProvider: any,
    resource: string
  ) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, `${resource}.xlsx`);
  };

  const handleClick = useCallback(
    (event) => {
      dataProvider
        .getList(resource, {
          sort,
          filter: filter ? { ...filterValues, ...filter } : filterValues,
          pagination: { page: 1, perPage: maxResults },
          meta,
        })
        .then(({ data }) => {
          if (exportToExcel) {
            exportToExcel(data, fetchRelatedRecords(dataProvider), dataProvider, resource);
          }
        })
        .catch((error) => {
          console.error(error);
          notify("ra.notification.http_error", { type: "error" });
        });

      if (typeof onClick === "function") {
        onClick(event);
      }
    },
    [dataProvider, filter, filterValues, maxResults, notify, onClick, resource, sort, meta]
  );

  return (
    <Button onClick={handleClick} label={label} disabled={total === 0} {...sanitizeRestProps(rest)}>
      {icon}
    </Button>
  );
};

const defaultIcon = <DownloadIcon />;

const sanitizeRestProps = ({
  resource,
  ...rest
}: Omit<ExportButtonProps, "maxResults" | "label" | "meta">) => rest;

interface Props {
  icon?: JSX.Element;
  label?: string;
  maxResults?: number;
  onClick?: (e: React.MouseEvent) => void;
  resource?: string;
  meta?: any;
}

export type ExportButtonProps = Props & ButtonProps;
