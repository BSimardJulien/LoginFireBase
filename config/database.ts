import { GetServerSideProps } from "next";
import ADODB from "node-adodb";

export const connectionDB = ADODB.open(
  "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=data/SecuriteCLB.mdb"
);

export const connectionDBLocal = ADODB.open(
  "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=data/SecuriteCLBLocal.mdb"
);



