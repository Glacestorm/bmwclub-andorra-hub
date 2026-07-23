export type GalleryMediaImage = {
  src: string;
  alt: string;
  filename: string;
};

export type GalleryMediaSection = {
  title: string;
  sourceFolder: string;
  note?: string;
  images: GalleryMediaImage[];
};

export const galleryMediaByPage: Record<string, GalleryMediaSection[]> = {
  "historiques": [
    {
      "title": "Arxiu històric - altres",
      "sourceFolder": "historiques/bmw_altres",
      "images": [
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Gerard%20de%20la%20Casa%20-%20any%20-%20lloc%20-%20Osella.jpg",
          "alt": "Arxiu històric - altres 1",
          "filename": "Gerard de la Casa - any - lloc - Osella.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Gerard%20de%20la%20Casa%20-%20lloc%20-%20any.jpg",
          "alt": "Arxiu històric - altres 2",
          "filename": "Gerard de la Casa - lloc - any.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Fernandez%20-%20Javier%20Riba%20-%201963%20-%20Rally%20RACE%20-%20BMW%20700.jpg",
          "alt": "Arxiu històric - altres 3",
          "filename": "Joan Fernandez - Javier Riba - 1963 - Rally RACE - BMW 700.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20-%201986%20-%20Fito.jpg",
          "alt": "Arxiu històric - altres 4",
          "filename": "Joan Vinyes - 1986 - Fito.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20-%201986%20-%20Valdezcaray.jpg",
          "alt": "Arxiu històric - altres 5",
          "filename": "Joan Vinyes - 1986 - Valdezcaray.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20dubte%20-%201989%20-%20Bienaparecida.jpg",
          "alt": "Arxiu històric - altres 6",
          "filename": "Joan Vinyes dubte - 1989 - Bienaparecida.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20dubte%20-%201989%20-%20lloc.jpg",
          "alt": "Arxiu històric - altres 7",
          "filename": "Joan Vinyes dubte - 1989 - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20dubte%20-%201992%20-%20lloc%20-%20Osella.jpg",
          "alt": "Arxiu històric - altres 8",
          "filename": "Joan Vinyes dubte - 1992 - lloc - Osella.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20dubte%20-%20any%20-%20lloc%202.jpg",
          "alt": "Arxiu històric - altres 9",
          "filename": "Joan Vinyes dubte - any - lloc 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20dubte%20-%20any%20-%20lloc%203.jpg",
          "alt": "Arxiu històric - altres 10",
          "filename": "Joan Vinyes dubte - any - lloc 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20dubte%20-%20any%20-%20lloc%204.jpg",
          "alt": "Arxiu històric - altres 11",
          "filename": "Joan Vinyes dubte - any - lloc 4.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20dubte%20-%20any%20-%20lloc%205.jpg",
          "alt": "Arxiu històric - altres 12",
          "filename": "Joan Vinyes dubte - any - lloc 5.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20dubte%20-%20any%20-%20lloc%206.jpg",
          "alt": "Arxiu històric - altres 13",
          "filename": "Joan Vinyes dubte - any - lloc 6.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20dubte%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - altres 14",
          "filename": "Joan Vinyes dubte - any - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Nati%20Dabad%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - altres 15",
          "filename": "Nati Dabad - any - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Parc%20Tancat%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - altres 16",
          "filename": "Parc Tancat - any - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Transport%20BMW.jpg",
          "alt": "Arxiu històric - altres 17",
          "filename": "Transport BMW.jpg"
        }
      ],
      "note": "Arxiu recuperat mantenint la carpeta original; datació fina pendent."
    },
    {
      "title": "Arxiu històric - BMW E10",
      "sourceFolder": "historiques/bmw_e10",
      "images": [
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/70_Rallye_Vasco_Navarro_Jos_M_Fern_ndez_C.jpg",
          "alt": "Arxiu històric - BMW E10 1",
          "filename": "70_Rallye_Vasco_Navarro_Jos_M_Fern_ndez_C.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-11874%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - BMW E10 2",
          "filename": "AND-11874 - any - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-12849%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - BMW E10 3",
          "filename": "AND-12849 - any - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-13075%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - BMW E10 4",
          "filename": "AND-13075 - any - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-13821%20-%20any%20-%20lloc%201.jpg",
          "alt": "Arxiu històric - BMW E10 5",
          "filename": "AND-13821 - any - lloc 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-13821%20-%20any%20-%20lloc%202.jpg",
          "alt": "Arxiu històric - BMW E10 6",
          "filename": "AND-13821 - any - lloc 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-13821%20-%20any%20-%20lloc%203.jpg",
          "alt": "Arxiu històric - BMW E10 7",
          "filename": "AND-13821 - any - lloc 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-7795%20-%20any%20-%20lloc%201.jpg",
          "alt": "Arxiu històric - BMW E10 8",
          "filename": "AND-7795 - any - lloc 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-7795%20-%20any%20-%20lloc%202.jpg",
          "alt": "Arxiu històric - BMW E10 9",
          "filename": "AND-7795 - any - lloc 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-8029%20-%20any%20-%20Fontaneda%201.jpg",
          "alt": "Arxiu històric - BMW E10 10",
          "filename": "AND-8029 - any - Fontaneda 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-8029%20-%20any%20-%20Fontaneda%202.jpg",
          "alt": "Arxiu històric - BMW E10 11",
          "filename": "AND-8029 - any - Fontaneda 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-8029%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - BMW E10 12",
          "filename": "AND-8029 - any - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-8451%20-%20any%20-%20lloc%201.jpg",
          "alt": "Arxiu històric - BMW E10 13",
          "filename": "AND-8451 - any - lloc 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-8451%20-%20any%20-%20lloc%202.jpg",
          "alt": "Arxiu històric - BMW E10 14",
          "filename": "AND-8451 - any - lloc 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-8690%20-%20any%20-%20Arinsal%201.jpg",
          "alt": "Arxiu històric - BMW E10 15",
          "filename": "AND-8690 - any - Arinsal 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-8690%20-%20any%20-%20Arinsal%202.jpg",
          "alt": "Arxiu històric - BMW E10 16",
          "filename": "AND-8690 - any - Arinsal 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-8690%20-%20any%20-%20lloc%201.jpg",
          "alt": "Arxiu històric - BMW E10 17",
          "filename": "AND-8690 - any - lloc 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-9378%20-%20any%20-%20Prats.jpg",
          "alt": "Arxiu històric - BMW E10 18",
          "filename": "AND-9378 - any - Prats.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-9651%20-%20any%20-%20Arinsal%201.jpg",
          "alt": "Arxiu històric - BMW E10 19",
          "filename": "AND-9651 - any - Arinsal 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-9651%20-%20any%20-%20Arinsal%202.jpg",
          "alt": "Arxiu històric - BMW E10 20",
          "filename": "AND-9651 - any - Arinsal 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-9651%20-%20any%20-%20Arinsal%203.jpg",
          "alt": "Arxiu històric - BMW E10 21",
          "filename": "AND-9651 - any - Arinsal 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-9651%20-%20any%20-%20Arinsal%204.jpg",
          "alt": "Arxiu històric - BMW E10 22",
          "filename": "AND-9651 - any - Arinsal 4.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-9651%20-%20any%20-%20lloc%201.jpg",
          "alt": "Arxiu històric - BMW E10 23",
          "filename": "AND-9651 - any - lloc 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-9651%20-%20any%20-%20lloc%202.jpg",
          "alt": "Arxiu històric - BMW E10 24",
          "filename": "AND-9651 - any - lloc 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-9685%20-%201972%20-%20Criterium%20Bergueda.jpg",
          "alt": "Arxiu històric - BMW E10 25",
          "filename": "AND-9685 - 1972 - Criterium Bergueda.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Cesar%20Perejoan-A%20Alvarez%20-%201970%20-%202000%20Viratges%201.jpg",
          "alt": "Arxiu històric - BMW E10 26",
          "filename": "Cesar Perejoan-A Alvarez - 1970 - 2000 Viratges 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Cesar%20Perejoan-A%20Alvarez%20-%201970%20-%202000%20Viratges%202.jpg",
          "alt": "Arxiu històric - BMW E10 27",
          "filename": "Cesar Perejoan-A Alvarez - 1970 - 2000 Viratges 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Cesar%20Perejoan-C%20Loverdos%20-%201971%20-%202000%20Viratges.jpg",
          "alt": "Arxiu històric - BMW E10 28",
          "filename": "Cesar Perejoan-C Loverdos - 1971 - 2000 Viratges.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Cesar%20Perejoan-J%20M%20Clot%20-%201970%20-%20Rias%20Bajas.jpg",
          "alt": "Arxiu històric - BMW E10 29",
          "filename": "Cesar Perejoan-J M Clot - 1970 - Rias Bajas.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Cesar%20Perejoan-J%20Maristany%20-%201970%20-%20Ral%C2%B7li%20Vasco%20Navarro%202.jpg",
          "alt": "Arxiu històric - BMW E10 30",
          "filename": "Cesar Perejoan-J Maristany - 1970 - Ral·li Vasco Navarro 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Cesar%20Perejoan-J%20Maristany%20-%201970%20-%20Vasco%20Navarro%201.jpg",
          "alt": "Arxiu històric - BMW E10 31",
          "filename": "Cesar Perejoan-J Maristany - 1970 - Vasco Navarro 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Ferran%20Font%20-%202013%20-%20Ral%C2%B7li%20Andorra.jpg",
          "alt": "Arxiu històric - BMW E10 32",
          "filename": "Ferran Font - 2013 - Ral·li Andorra.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Ferran%20Font%20-%20any%20-%20Prats.jpg",
          "alt": "Arxiu històric - BMW E10 33",
          "filename": "Ferran Font - any - Prats.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Fidel%20Riba%20-%201971%20-%20Ral%C2%B7li%20Llana%201.jpg",
          "alt": "Arxiu històric - BMW E10 34",
          "filename": "Fidel Riba - 1971 - Ral·li Llana 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Fidel%20Riba%20-%201971%20-%20Ral%C2%B7li%20Llana%202.jpg",
          "alt": "Arxiu històric - BMW E10 35",
          "filename": "Fidel Riba - 1971 - Ral·li Llana 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Fidel%20Riba%20-%201971%20-%20Ral%C2%B7li%20Llana%203.jpg",
          "alt": "Arxiu històric - BMW E10 36",
          "filename": "Fidel Riba - 1971 - Ral·li Llana 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Garriga-Gonzalez%20-%201972%20-%20Criterium%20Bergueda.jpg",
          "alt": "Arxiu històric - BMW E10 37",
          "filename": "Garriga-Gonzalez - 1972 - Criterium Bergueda.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Gerard%20Hoffmann-J%20Monaco%20-%201971%20-%20Barcelona-Andorra.jpg",
          "alt": "Arxiu històric - BMW E10 38",
          "filename": "Gerard Hoffmann-J Monaco - 1971 - Barcelona-Andorra.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Jean-Paul%20Rossell%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - BMW E10 39",
          "filename": "Jean-Paul Rossell - any - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Joan%20Montes%20-%201971%20-%20lloc.jpg",
          "alt": "Arxiu històric - BMW E10 40",
          "filename": "Joan Montes - 1971 - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Joan%20Montes%20-%201973%20-%20Ral%C2%B7li%20Andorra.jpg",
          "alt": "Arxiu històric - BMW E10 41",
          "filename": "Joan Montes - 1973 - Ral·li Andorra.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Josep%20Estefanell%20-%20any%20-%20Prats%201.jpg",
          "alt": "Arxiu històric - BMW E10 42",
          "filename": "Josep Estefanell - any - Prats 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Josep%20Estefanell%20-%20any%20-%20lloc%201.jpg",
          "alt": "Arxiu històric - BMW E10 43",
          "filename": "Josep Estefanell - any - lloc 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Josep%20Estefanell%20-%20any%20-%20lloc%202.jpg",
          "alt": "Arxiu històric - BMW E10 44",
          "filename": "Josep Estefanell - any - lloc 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Josep%20Estefanell%20-%20any%20-%20lloc%203.jpg",
          "alt": "Arxiu històric - BMW E10 45",
          "filename": "Josep Estefanell - any - lloc 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Josep%20Estefanell%20-%20any%20-%20lloc%204.jpg",
          "alt": "Arxiu històric - BMW E10 46",
          "filename": "Josep Estefanell - any - lloc 4.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Josep%20Estefanell%20-%20any%20-%20lloc%205.jpg",
          "alt": "Arxiu històric - BMW E10 47",
          "filename": "Josep Estefanell - any - lloc 5.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Josep%20March%20-%20any%20-%20Ral%C2%B7li%20Catalunya.jpg",
          "alt": "Arxiu històric - BMW E10 48",
          "filename": "Josep March - any - Ral·li Catalunya.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Josep%20March%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - BMW E10 49",
          "filename": "Josep March - any - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Josep%20March-Ribolleda%20-%20any%20-%20Ral%C2%B7li%20Andorra.jpg",
          "alt": "Arxiu històric - BMW E10 50",
          "filename": "Josep March-Ribolleda - any - Ral·li Andorra.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/MKN%20-%20any%20-%20lloc%201.jpg",
          "alt": "Arxiu històric - BMW E10 51",
          "filename": "MKN - any - lloc 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/MKN%20-%20any%20-%20lloc%202.jpg",
          "alt": "Arxiu històric - BMW E10 52",
          "filename": "MKN - any - lloc 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/MKN%20-%20any%20-%20lloc%203.jpg",
          "alt": "Arxiu històric - BMW E10 53",
          "filename": "MKN - any - lloc 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/MT-3884%20-%201972%20-%20Criterium%20Bergueda%201.jpg",
          "alt": "Arxiu històric - BMW E10 54",
          "filename": "MT-3884 - 1972 - Criterium Bergueda 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/MT-3884%20-%201972%20-%20Criterium%20Bergueda%202.jpg",
          "alt": "Arxiu històric - BMW E10 55",
          "filename": "MT-3884 - 1972 - Criterium Bergueda 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Roig-Pelegri%20-%201972%20-%20Criterium%20Bergueda.jpg",
          "alt": "Arxiu històric - BMW E10 56",
          "filename": "Roig-Pelegri - 1972 - Criterium Bergueda.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Toni%20Riberaygua%20-%201988%20-%20Bixessarri.jpg",
          "alt": "Arxiu històric - BMW E10 57",
          "filename": "Toni Riberaygua - 1988 - Bixessarri.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Toni%20Riberaygua%20-%201988%20-%20Criterium%20Bergueda.jpg",
          "alt": "Arxiu històric - BMW E10 58",
          "filename": "Toni Riberaygua - 1988 - Criterium Bergueda.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Toni%20Riberaygua%20-%201988%20-%20Engolasters.jpg",
          "alt": "Arxiu històric - BMW E10 59",
          "filename": "Toni Riberaygua - 1988 - Engolasters.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Toni%20Riberaygua%20-%201990%20-%20Ral%C2%B7li%20Hivern.jpg",
          "alt": "Arxiu històric - BMW E10 60",
          "filename": "Toni Riberaygua - 1990 - Ral·li Hivern.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Toni%20Riberaygua%20-%20any%20-%20lloc%202.jpg",
          "alt": "Arxiu històric - BMW E10 61",
          "filename": "Toni Riberaygua - any - lloc 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Toni%20Riberaygua%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - BMW E10 62",
          "filename": "Toni Riberaygua - any - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Toni%20Riberaygua%20-%20expo%20-%20Ralli%20Andorra.jpg",
          "alt": "Arxiu històric - BMW E10 63",
          "filename": "Toni Riberaygua - expo - Ralli Andorra.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%201998%20-%20Ral%C2%B7li%20Andorra.jpg",
          "alt": "Arxiu històric - BMW E10 64",
          "filename": "qui - 1998 - Ral·li Andorra.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20Alcanyis.jpg",
          "alt": "Arxiu històric - BMW E10 65",
          "filename": "qui - any - Alcanyis.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20Coll%20de%20Jou%202.jpg",
          "alt": "Arxiu històric - BMW E10 66",
          "filename": "qui - any - Coll de Jou 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20Coll%20de%20Jou.jpg",
          "alt": "Arxiu històric - BMW E10 67",
          "filename": "qui - any - Coll de Jou.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20Prats%202.jpg",
          "alt": "Arxiu històric - BMW E10 68",
          "filename": "qui - any - Prats 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20Prats%203.jpg",
          "alt": "Arxiu històric - BMW E10 69",
          "filename": "qui - any - Prats 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20Prats%204.jpg",
          "alt": "Arxiu històric - BMW E10 70",
          "filename": "qui - any - Prats 4.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20lloc%201.jpg",
          "alt": "Arxiu històric - BMW E10 71",
          "filename": "qui - any - lloc 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20lloc%202.jpg",
          "alt": "Arxiu històric - BMW E10 72",
          "filename": "qui - any - lloc 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20lloc%203.jpg",
          "alt": "Arxiu històric - BMW E10 73",
          "filename": "qui - any - lloc 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20lloc%204.jpg",
          "alt": "Arxiu històric - BMW E10 74",
          "filename": "qui - any - lloc 4.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20lloc%205.jpg",
          "alt": "Arxiu històric - BMW E10 75",
          "filename": "qui - any - lloc 5.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20lloc%206.jpg",
          "alt": "Arxiu històric - BMW E10 76",
          "filename": "qui - any - lloc 6.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20lloc%207.jpg",
          "alt": "Arxiu històric - BMW E10 77",
          "filename": "qui - any - lloc 7.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20lloc.png",
          "alt": "Arxiu històric - BMW E10 78",
          "filename": "qui - any - lloc.png"
        }
      ],
      "note": "Arxiu recuperat mantenint la carpeta original; datació fina pendent."
    },
    {
      "title": "Arxiu històric - BMW E21",
      "sourceFolder": "historiques/bmw_e21",
      "images": [
        {
          "src": "/legacy-mirror/images/historiques/bmw_e21/qui%20-%201980%20-%20Criterium%20Bergueda.jpg",
          "alt": "Arxiu històric - BMW E21 1",
          "filename": "qui - 1980 - Criterium Bergueda.jpg"
        }
      ],
      "note": "Arxiu recuperat mantenint la carpeta original; datació fina pendent."
    },
    {
      "title": "Arxiu històric - BMW E30",
      "sourceFolder": "historiques/bmw_e30",
      "images": [
        {
          "src": "/legacy-mirror/images/historiques/bmw_e30/Gerard%20de%20la%20Casa%20-%201990%20-%20Saint%20Pol%202.jpg",
          "alt": "Arxiu històric - BMW E30 1",
          "filename": "Gerard de la Casa - 1990 - Saint Pol 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e30/Gerard%20de%20la%20Casa%20-%201990%20-%20Saint%20Pol.jpg",
          "alt": "Arxiu històric - BMW E30 2",
          "filename": "Gerard de la Casa - 1990 - Saint Pol.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e30/Gerard%20de%20la%20Casa%20-%20any%20-%20Llacuna%202.jpg",
          "alt": "Arxiu històric - BMW E30 3",
          "filename": "Gerard de la Casa - any - Llacuna 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e30/Gerard%20de%20la%20Casa%20-%20any%20-%20Llacuna%203.jpg",
          "alt": "Arxiu històric - BMW E30 4",
          "filename": "Gerard de la Casa - any - Llacuna 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e30/Gerard%20de%20la%20Casa%20-%20any%20-%20Llacuna.jpg",
          "alt": "Arxiu històric - BMW E30 5",
          "filename": "Gerard de la Casa - any - Llacuna.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e30/Gerard%20de%20la%20Casa%20-%20any%20-%20lloc%202.jpg",
          "alt": "Arxiu històric - BMW E30 6",
          "filename": "Gerard de la Casa - any - lloc 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e30/Gerard%20de%20la%20Casa%20-%20any%20-%20lloc%203.jpg",
          "alt": "Arxiu històric - BMW E30 7",
          "filename": "Gerard de la Casa - any - lloc 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e30/Gerard%20de%20la%20Casa%20-%20any%20-%20lloc%204.jpg",
          "alt": "Arxiu històric - BMW E30 8",
          "filename": "Gerard de la Casa - any - lloc 4.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e30/Gerard%20de%20la%20Casa%20-%20any%20-%20lloc%205.jpg",
          "alt": "Arxiu històric - BMW E30 9",
          "filename": "Gerard de la Casa - any - lloc 5.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e30/Gerard%20de%20la%20Casa%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - BMW E30 10",
          "filename": "Gerard de la Casa - any - lloc.jpg"
        }
      ],
      "note": "Arxiu recuperat mantenint la carpeta original; datació fina pendent."
    },
    {
      "title": "Cloenda 13/11/2022",
      "sourceFolder": "phocagallery/sortides (origen) → classificat a històriques/2022",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/91fbd5de-c6aa-4015-9bf3-aa6a71b4a618.jpg",
          "alt": "Cloenda 13/11/2022 1",
          "filename": "91fbd5de-c6aa-4015-9bf3-aa6a71b4a618.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/f330e16d-9d12-4541-8ee1-566d836b454f.jpg",
          "alt": "Cloenda 13/11/2022 2",
          "filename": "f330e16d-9d12-4541-8ee1-566d836b454f.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/foto_no_exif.jpg",
          "alt": "Cloenda 13/11/2022 3",
          "filename": "foto_no_exif.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/foto_no_exif_1.jpg",
          "alt": "Cloenda 13/11/2022 4",
          "filename": "foto_no_exif_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/foto_no_exif_2.jpg",
          "alt": "Cloenda 13/11/2022 5",
          "filename": "foto_no_exif_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/foto_no_exif_3.jpg",
          "alt": "Cloenda 13/11/2022 6",
          "filename": "foto_no_exif_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/foto_no_exif_4.jpg",
          "alt": "Cloenda 13/11/2022 7",
          "filename": "foto_no_exif_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/img-0151.jpg",
          "alt": "Cloenda 13/11/2022 8",
          "filename": "img-0151.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/img-0154.jpg",
          "alt": "Cloenda 13/11/2022 9",
          "filename": "img-0154.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/img-0155.jpg",
          "alt": "Cloenda 13/11/2022 10",
          "filename": "img-0155.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/img-0158.jpg",
          "alt": "Cloenda 13/11/2022 11",
          "filename": "img-0158.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/img-0159.jpg",
          "alt": "Cloenda 13/11/2022 12",
          "filename": "img-0159.jpg"
        }
      ],
      "note": "Agrupat amb EXIF 2022-11-13 i coincidència visual."
    }
  ],
  "historiques_2011_2012": [
    {
      "title": "Arxiu històric - altres",
      "sourceFolder": "historiques/bmw_altres",
      "images": [
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Gerard%20de%20la%20Casa%20-%20any%20-%20lloc%20-%20Osella.jpg",
          "alt": "Arxiu històric - altres 1",
          "filename": "Gerard de la Casa - any - lloc - Osella.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Gerard%20de%20la%20Casa%20-%20lloc%20-%20any.jpg",
          "alt": "Arxiu històric - altres 2",
          "filename": "Gerard de la Casa - lloc - any.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Fernandez%20-%20Javier%20Riba%20-%201963%20-%20Rally%20RACE%20-%20BMW%20700.jpg",
          "alt": "Arxiu històric - altres 3",
          "filename": "Joan Fernandez - Javier Riba - 1963 - Rally RACE - BMW 700.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20-%201986%20-%20Fito.jpg",
          "alt": "Arxiu històric - altres 4",
          "filename": "Joan Vinyes - 1986 - Fito.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20-%201986%20-%20Valdezcaray.jpg",
          "alt": "Arxiu històric - altres 5",
          "filename": "Joan Vinyes - 1986 - Valdezcaray.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20dubte%20-%201989%20-%20Bienaparecida.jpg",
          "alt": "Arxiu històric - altres 6",
          "filename": "Joan Vinyes dubte - 1989 - Bienaparecida.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20dubte%20-%201989%20-%20lloc.jpg",
          "alt": "Arxiu històric - altres 7",
          "filename": "Joan Vinyes dubte - 1989 - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20dubte%20-%201992%20-%20lloc%20-%20Osella.jpg",
          "alt": "Arxiu històric - altres 8",
          "filename": "Joan Vinyes dubte - 1992 - lloc - Osella.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20dubte%20-%20any%20-%20lloc%202.jpg",
          "alt": "Arxiu històric - altres 9",
          "filename": "Joan Vinyes dubte - any - lloc 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20dubte%20-%20any%20-%20lloc%203.jpg",
          "alt": "Arxiu històric - altres 10",
          "filename": "Joan Vinyes dubte - any - lloc 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20dubte%20-%20any%20-%20lloc%204.jpg",
          "alt": "Arxiu històric - altres 11",
          "filename": "Joan Vinyes dubte - any - lloc 4.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20dubte%20-%20any%20-%20lloc%205.jpg",
          "alt": "Arxiu històric - altres 12",
          "filename": "Joan Vinyes dubte - any - lloc 5.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20dubte%20-%20any%20-%20lloc%206.jpg",
          "alt": "Arxiu històric - altres 13",
          "filename": "Joan Vinyes dubte - any - lloc 6.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Joan%20Vinyes%20dubte%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - altres 14",
          "filename": "Joan Vinyes dubte - any - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Nati%20Dabad%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - altres 15",
          "filename": "Nati Dabad - any - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Parc%20Tancat%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - altres 16",
          "filename": "Parc Tancat - any - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_altres/Transport%20BMW.jpg",
          "alt": "Arxiu històric - altres 17",
          "filename": "Transport BMW.jpg"
        }
      ],
      "note": "Arxiu recuperat mantenint la carpeta original; datació fina pendent."
    }
  ],
  "historiques_2013_2015": [
    {
      "title": "Arxiu històric - BMW E10",
      "sourceFolder": "historiques/bmw_e10",
      "images": [
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/70_Rallye_Vasco_Navarro_Jos_M_Fern_ndez_C.jpg",
          "alt": "Arxiu històric - BMW E10 1",
          "filename": "70_Rallye_Vasco_Navarro_Jos_M_Fern_ndez_C.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-11874%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - BMW E10 2",
          "filename": "AND-11874 - any - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-12849%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - BMW E10 3",
          "filename": "AND-12849 - any - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-13075%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - BMW E10 4",
          "filename": "AND-13075 - any - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-13821%20-%20any%20-%20lloc%201.jpg",
          "alt": "Arxiu històric - BMW E10 5",
          "filename": "AND-13821 - any - lloc 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-13821%20-%20any%20-%20lloc%202.jpg",
          "alt": "Arxiu històric - BMW E10 6",
          "filename": "AND-13821 - any - lloc 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-13821%20-%20any%20-%20lloc%203.jpg",
          "alt": "Arxiu històric - BMW E10 7",
          "filename": "AND-13821 - any - lloc 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-7795%20-%20any%20-%20lloc%201.jpg",
          "alt": "Arxiu històric - BMW E10 8",
          "filename": "AND-7795 - any - lloc 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-7795%20-%20any%20-%20lloc%202.jpg",
          "alt": "Arxiu històric - BMW E10 9",
          "filename": "AND-7795 - any - lloc 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-8029%20-%20any%20-%20Fontaneda%201.jpg",
          "alt": "Arxiu històric - BMW E10 10",
          "filename": "AND-8029 - any - Fontaneda 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-8029%20-%20any%20-%20Fontaneda%202.jpg",
          "alt": "Arxiu històric - BMW E10 11",
          "filename": "AND-8029 - any - Fontaneda 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-8029%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - BMW E10 12",
          "filename": "AND-8029 - any - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-8451%20-%20any%20-%20lloc%201.jpg",
          "alt": "Arxiu històric - BMW E10 13",
          "filename": "AND-8451 - any - lloc 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-8451%20-%20any%20-%20lloc%202.jpg",
          "alt": "Arxiu històric - BMW E10 14",
          "filename": "AND-8451 - any - lloc 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-8690%20-%20any%20-%20Arinsal%201.jpg",
          "alt": "Arxiu històric - BMW E10 15",
          "filename": "AND-8690 - any - Arinsal 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-8690%20-%20any%20-%20Arinsal%202.jpg",
          "alt": "Arxiu històric - BMW E10 16",
          "filename": "AND-8690 - any - Arinsal 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-8690%20-%20any%20-%20lloc%201.jpg",
          "alt": "Arxiu històric - BMW E10 17",
          "filename": "AND-8690 - any - lloc 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-9378%20-%20any%20-%20Prats.jpg",
          "alt": "Arxiu històric - BMW E10 18",
          "filename": "AND-9378 - any - Prats.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-9651%20-%20any%20-%20Arinsal%201.jpg",
          "alt": "Arxiu històric - BMW E10 19",
          "filename": "AND-9651 - any - Arinsal 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-9651%20-%20any%20-%20Arinsal%202.jpg",
          "alt": "Arxiu històric - BMW E10 20",
          "filename": "AND-9651 - any - Arinsal 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-9651%20-%20any%20-%20Arinsal%203.jpg",
          "alt": "Arxiu històric - BMW E10 21",
          "filename": "AND-9651 - any - Arinsal 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-9651%20-%20any%20-%20Arinsal%204.jpg",
          "alt": "Arxiu històric - BMW E10 22",
          "filename": "AND-9651 - any - Arinsal 4.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-9651%20-%20any%20-%20lloc%201.jpg",
          "alt": "Arxiu històric - BMW E10 23",
          "filename": "AND-9651 - any - lloc 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-9651%20-%20any%20-%20lloc%202.jpg",
          "alt": "Arxiu històric - BMW E10 24",
          "filename": "AND-9651 - any - lloc 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/AND-9685%20-%201972%20-%20Criterium%20Bergueda.jpg",
          "alt": "Arxiu històric - BMW E10 25",
          "filename": "AND-9685 - 1972 - Criterium Bergueda.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Cesar%20Perejoan-A%20Alvarez%20-%201970%20-%202000%20Viratges%201.jpg",
          "alt": "Arxiu històric - BMW E10 26",
          "filename": "Cesar Perejoan-A Alvarez - 1970 - 2000 Viratges 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Cesar%20Perejoan-A%20Alvarez%20-%201970%20-%202000%20Viratges%202.jpg",
          "alt": "Arxiu històric - BMW E10 27",
          "filename": "Cesar Perejoan-A Alvarez - 1970 - 2000 Viratges 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Cesar%20Perejoan-C%20Loverdos%20-%201971%20-%202000%20Viratges.jpg",
          "alt": "Arxiu històric - BMW E10 28",
          "filename": "Cesar Perejoan-C Loverdos - 1971 - 2000 Viratges.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Cesar%20Perejoan-J%20M%20Clot%20-%201970%20-%20Rias%20Bajas.jpg",
          "alt": "Arxiu històric - BMW E10 29",
          "filename": "Cesar Perejoan-J M Clot - 1970 - Rias Bajas.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Cesar%20Perejoan-J%20Maristany%20-%201970%20-%20Ral%C2%B7li%20Vasco%20Navarro%202.jpg",
          "alt": "Arxiu històric - BMW E10 30",
          "filename": "Cesar Perejoan-J Maristany - 1970 - Ral·li Vasco Navarro 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Cesar%20Perejoan-J%20Maristany%20-%201970%20-%20Vasco%20Navarro%201.jpg",
          "alt": "Arxiu històric - BMW E10 31",
          "filename": "Cesar Perejoan-J Maristany - 1970 - Vasco Navarro 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Ferran%20Font%20-%202013%20-%20Ral%C2%B7li%20Andorra.jpg",
          "alt": "Arxiu històric - BMW E10 32",
          "filename": "Ferran Font - 2013 - Ral·li Andorra.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Ferran%20Font%20-%20any%20-%20Prats.jpg",
          "alt": "Arxiu històric - BMW E10 33",
          "filename": "Ferran Font - any - Prats.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Fidel%20Riba%20-%201971%20-%20Ral%C2%B7li%20Llana%201.jpg",
          "alt": "Arxiu històric - BMW E10 34",
          "filename": "Fidel Riba - 1971 - Ral·li Llana 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Fidel%20Riba%20-%201971%20-%20Ral%C2%B7li%20Llana%202.jpg",
          "alt": "Arxiu històric - BMW E10 35",
          "filename": "Fidel Riba - 1971 - Ral·li Llana 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Fidel%20Riba%20-%201971%20-%20Ral%C2%B7li%20Llana%203.jpg",
          "alt": "Arxiu històric - BMW E10 36",
          "filename": "Fidel Riba - 1971 - Ral·li Llana 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Garriga-Gonzalez%20-%201972%20-%20Criterium%20Bergueda.jpg",
          "alt": "Arxiu històric - BMW E10 37",
          "filename": "Garriga-Gonzalez - 1972 - Criterium Bergueda.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Gerard%20Hoffmann-J%20Monaco%20-%201971%20-%20Barcelona-Andorra.jpg",
          "alt": "Arxiu històric - BMW E10 38",
          "filename": "Gerard Hoffmann-J Monaco - 1971 - Barcelona-Andorra.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Jean-Paul%20Rossell%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - BMW E10 39",
          "filename": "Jean-Paul Rossell - any - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Joan%20Montes%20-%201971%20-%20lloc.jpg",
          "alt": "Arxiu històric - BMW E10 40",
          "filename": "Joan Montes - 1971 - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Joan%20Montes%20-%201973%20-%20Ral%C2%B7li%20Andorra.jpg",
          "alt": "Arxiu històric - BMW E10 41",
          "filename": "Joan Montes - 1973 - Ral·li Andorra.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Josep%20Estefanell%20-%20any%20-%20Prats%201.jpg",
          "alt": "Arxiu històric - BMW E10 42",
          "filename": "Josep Estefanell - any - Prats 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Josep%20Estefanell%20-%20any%20-%20lloc%201.jpg",
          "alt": "Arxiu històric - BMW E10 43",
          "filename": "Josep Estefanell - any - lloc 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Josep%20Estefanell%20-%20any%20-%20lloc%202.jpg",
          "alt": "Arxiu històric - BMW E10 44",
          "filename": "Josep Estefanell - any - lloc 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Josep%20Estefanell%20-%20any%20-%20lloc%203.jpg",
          "alt": "Arxiu històric - BMW E10 45",
          "filename": "Josep Estefanell - any - lloc 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Josep%20Estefanell%20-%20any%20-%20lloc%204.jpg",
          "alt": "Arxiu històric - BMW E10 46",
          "filename": "Josep Estefanell - any - lloc 4.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Josep%20Estefanell%20-%20any%20-%20lloc%205.jpg",
          "alt": "Arxiu històric - BMW E10 47",
          "filename": "Josep Estefanell - any - lloc 5.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Josep%20March%20-%20any%20-%20Ral%C2%B7li%20Catalunya.jpg",
          "alt": "Arxiu històric - BMW E10 48",
          "filename": "Josep March - any - Ral·li Catalunya.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Josep%20March%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - BMW E10 49",
          "filename": "Josep March - any - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Josep%20March-Ribolleda%20-%20any%20-%20Ral%C2%B7li%20Andorra.jpg",
          "alt": "Arxiu històric - BMW E10 50",
          "filename": "Josep March-Ribolleda - any - Ral·li Andorra.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/MKN%20-%20any%20-%20lloc%201.jpg",
          "alt": "Arxiu històric - BMW E10 51",
          "filename": "MKN - any - lloc 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/MKN%20-%20any%20-%20lloc%202.jpg",
          "alt": "Arxiu històric - BMW E10 52",
          "filename": "MKN - any - lloc 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/MKN%20-%20any%20-%20lloc%203.jpg",
          "alt": "Arxiu històric - BMW E10 53",
          "filename": "MKN - any - lloc 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/MT-3884%20-%201972%20-%20Criterium%20Bergueda%201.jpg",
          "alt": "Arxiu històric - BMW E10 54",
          "filename": "MT-3884 - 1972 - Criterium Bergueda 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/MT-3884%20-%201972%20-%20Criterium%20Bergueda%202.jpg",
          "alt": "Arxiu històric - BMW E10 55",
          "filename": "MT-3884 - 1972 - Criterium Bergueda 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Roig-Pelegri%20-%201972%20-%20Criterium%20Bergueda.jpg",
          "alt": "Arxiu històric - BMW E10 56",
          "filename": "Roig-Pelegri - 1972 - Criterium Bergueda.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Toni%20Riberaygua%20-%201988%20-%20Bixessarri.jpg",
          "alt": "Arxiu històric - BMW E10 57",
          "filename": "Toni Riberaygua - 1988 - Bixessarri.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Toni%20Riberaygua%20-%201988%20-%20Criterium%20Bergueda.jpg",
          "alt": "Arxiu històric - BMW E10 58",
          "filename": "Toni Riberaygua - 1988 - Criterium Bergueda.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Toni%20Riberaygua%20-%201988%20-%20Engolasters.jpg",
          "alt": "Arxiu històric - BMW E10 59",
          "filename": "Toni Riberaygua - 1988 - Engolasters.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Toni%20Riberaygua%20-%201990%20-%20Ral%C2%B7li%20Hivern.jpg",
          "alt": "Arxiu històric - BMW E10 60",
          "filename": "Toni Riberaygua - 1990 - Ral·li Hivern.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Toni%20Riberaygua%20-%20any%20-%20lloc%202.jpg",
          "alt": "Arxiu històric - BMW E10 61",
          "filename": "Toni Riberaygua - any - lloc 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Toni%20Riberaygua%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - BMW E10 62",
          "filename": "Toni Riberaygua - any - lloc.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/Toni%20Riberaygua%20-%20expo%20-%20Ralli%20Andorra.jpg",
          "alt": "Arxiu històric - BMW E10 63",
          "filename": "Toni Riberaygua - expo - Ralli Andorra.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%201998%20-%20Ral%C2%B7li%20Andorra.jpg",
          "alt": "Arxiu històric - BMW E10 64",
          "filename": "qui - 1998 - Ral·li Andorra.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20Alcanyis.jpg",
          "alt": "Arxiu històric - BMW E10 65",
          "filename": "qui - any - Alcanyis.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20Coll%20de%20Jou%202.jpg",
          "alt": "Arxiu històric - BMW E10 66",
          "filename": "qui - any - Coll de Jou 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20Coll%20de%20Jou.jpg",
          "alt": "Arxiu històric - BMW E10 67",
          "filename": "qui - any - Coll de Jou.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20Prats%202.jpg",
          "alt": "Arxiu històric - BMW E10 68",
          "filename": "qui - any - Prats 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20Prats%203.jpg",
          "alt": "Arxiu històric - BMW E10 69",
          "filename": "qui - any - Prats 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20Prats%204.jpg",
          "alt": "Arxiu històric - BMW E10 70",
          "filename": "qui - any - Prats 4.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20lloc%201.jpg",
          "alt": "Arxiu històric - BMW E10 71",
          "filename": "qui - any - lloc 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20lloc%202.jpg",
          "alt": "Arxiu històric - BMW E10 72",
          "filename": "qui - any - lloc 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20lloc%203.jpg",
          "alt": "Arxiu històric - BMW E10 73",
          "filename": "qui - any - lloc 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20lloc%204.jpg",
          "alt": "Arxiu històric - BMW E10 74",
          "filename": "qui - any - lloc 4.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20lloc%205.jpg",
          "alt": "Arxiu històric - BMW E10 75",
          "filename": "qui - any - lloc 5.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20lloc%206.jpg",
          "alt": "Arxiu històric - BMW E10 76",
          "filename": "qui - any - lloc 6.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20lloc%207.jpg",
          "alt": "Arxiu històric - BMW E10 77",
          "filename": "qui - any - lloc 7.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e10/qui%20-%20any%20-%20lloc.png",
          "alt": "Arxiu històric - BMW E10 78",
          "filename": "qui - any - lloc.png"
        }
      ],
      "note": "Arxiu recuperat mantenint la carpeta original; datació fina pendent."
    }
  ],
  "historiques_2016_2021": [
    {
      "title": "Arxiu històric - BMW E21",
      "sourceFolder": "historiques/bmw_e21",
      "images": [
        {
          "src": "/legacy-mirror/images/historiques/bmw_e21/qui%20-%201980%20-%20Criterium%20Bergueda.jpg",
          "alt": "Arxiu històric - BMW E21 1",
          "filename": "qui - 1980 - Criterium Bergueda.jpg"
        }
      ],
      "note": "Arxiu recuperat mantenint la carpeta original; datació fina pendent."
    },
    {
      "title": "Arxiu històric - BMW E30",
      "sourceFolder": "historiques/bmw_e30",
      "images": [
        {
          "src": "/legacy-mirror/images/historiques/bmw_e30/Gerard%20de%20la%20Casa%20-%201990%20-%20Saint%20Pol%202.jpg",
          "alt": "Arxiu històric - BMW E30 1",
          "filename": "Gerard de la Casa - 1990 - Saint Pol 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e30/Gerard%20de%20la%20Casa%20-%201990%20-%20Saint%20Pol.jpg",
          "alt": "Arxiu històric - BMW E30 2",
          "filename": "Gerard de la Casa - 1990 - Saint Pol.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e30/Gerard%20de%20la%20Casa%20-%20any%20-%20Llacuna%202.jpg",
          "alt": "Arxiu històric - BMW E30 3",
          "filename": "Gerard de la Casa - any - Llacuna 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e30/Gerard%20de%20la%20Casa%20-%20any%20-%20Llacuna%203.jpg",
          "alt": "Arxiu històric - BMW E30 4",
          "filename": "Gerard de la Casa - any - Llacuna 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e30/Gerard%20de%20la%20Casa%20-%20any%20-%20Llacuna.jpg",
          "alt": "Arxiu històric - BMW E30 5",
          "filename": "Gerard de la Casa - any - Llacuna.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e30/Gerard%20de%20la%20Casa%20-%20any%20-%20lloc%202.jpg",
          "alt": "Arxiu històric - BMW E30 6",
          "filename": "Gerard de la Casa - any - lloc 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e30/Gerard%20de%20la%20Casa%20-%20any%20-%20lloc%203.jpg",
          "alt": "Arxiu històric - BMW E30 7",
          "filename": "Gerard de la Casa - any - lloc 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e30/Gerard%20de%20la%20Casa%20-%20any%20-%20lloc%204.jpg",
          "alt": "Arxiu històric - BMW E30 8",
          "filename": "Gerard de la Casa - any - lloc 4.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e30/Gerard%20de%20la%20Casa%20-%20any%20-%20lloc%205.jpg",
          "alt": "Arxiu històric - BMW E30 9",
          "filename": "Gerard de la Casa - any - lloc 5.jpg"
        },
        {
          "src": "/legacy-mirror/images/historiques/bmw_e30/Gerard%20de%20la%20Casa%20-%20any%20-%20lloc.jpg",
          "alt": "Arxiu històric - BMW E30 10",
          "filename": "Gerard de la Casa - any - lloc.jpg"
        }
      ],
      "note": "Arxiu recuperat mantenint la carpeta original; datació fina pendent."
    }
  ],
  "historiques_2022": [
    {
      "title": "Sortida Calçotada 27/03/2022",
      "sourceFolder": "phocagallery/historiques/Calsotada_27_03_22",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0291.jpg",
          "alt": "Sortida Calçotada 27/03/2022 1",
          "filename": "dsc-0291.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0293.jpg",
          "alt": "Sortida Calçotada 27/03/2022 2",
          "filename": "dsc-0293.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0294.jpg",
          "alt": "Sortida Calçotada 27/03/2022 3",
          "filename": "dsc-0294.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0295.jpg",
          "alt": "Sortida Calçotada 27/03/2022 4",
          "filename": "dsc-0295.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0303.jpg",
          "alt": "Sortida Calçotada 27/03/2022 5",
          "filename": "dsc-0303.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0304.jpg",
          "alt": "Sortida Calçotada 27/03/2022 6",
          "filename": "dsc-0304.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0305.jpg",
          "alt": "Sortida Calçotada 27/03/2022 7",
          "filename": "dsc-0305.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0306.jpg",
          "alt": "Sortida Calçotada 27/03/2022 8",
          "filename": "dsc-0306.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0307.jpg",
          "alt": "Sortida Calçotada 27/03/2022 9",
          "filename": "dsc-0307.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0308.jpg",
          "alt": "Sortida Calçotada 27/03/2022 10",
          "filename": "dsc-0308.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0311.jpg",
          "alt": "Sortida Calçotada 27/03/2022 11",
          "filename": "dsc-0311.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0312.jpg",
          "alt": "Sortida Calçotada 27/03/2022 12",
          "filename": "dsc-0312.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0314.jpg",
          "alt": "Sortida Calçotada 27/03/2022 13",
          "filename": "dsc-0314.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0316.jpg",
          "alt": "Sortida Calçotada 27/03/2022 14",
          "filename": "dsc-0316.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0317.jpg",
          "alt": "Sortida Calçotada 27/03/2022 15",
          "filename": "dsc-0317.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0318.jpg",
          "alt": "Sortida Calçotada 27/03/2022 16",
          "filename": "dsc-0318.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0319.jpg",
          "alt": "Sortida Calçotada 27/03/2022 17",
          "filename": "dsc-0319.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0322.jpg",
          "alt": "Sortida Calçotada 27/03/2022 18",
          "filename": "dsc-0322.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0323.jpg",
          "alt": "Sortida Calçotada 27/03/2022 19",
          "filename": "dsc-0323.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0324.jpg",
          "alt": "Sortida Calçotada 27/03/2022 20",
          "filename": "dsc-0324.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0325.jpg",
          "alt": "Sortida Calçotada 27/03/2022 21",
          "filename": "dsc-0325.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0327.jpg",
          "alt": "Sortida Calçotada 27/03/2022 22",
          "filename": "dsc-0327.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0328.jpg",
          "alt": "Sortida Calçotada 27/03/2022 23",
          "filename": "dsc-0328.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0329.jpg",
          "alt": "Sortida Calçotada 27/03/2022 24",
          "filename": "dsc-0329.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0330.jpg",
          "alt": "Sortida Calçotada 27/03/2022 25",
          "filename": "dsc-0330.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0331.jpg",
          "alt": "Sortida Calçotada 27/03/2022 26",
          "filename": "dsc-0331.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0332.jpg",
          "alt": "Sortida Calçotada 27/03/2022 27",
          "filename": "dsc-0332.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0333.jpg",
          "alt": "Sortida Calçotada 27/03/2022 28",
          "filename": "dsc-0333.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0334.jpg",
          "alt": "Sortida Calçotada 27/03/2022 29",
          "filename": "dsc-0334.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0335.jpg",
          "alt": "Sortida Calçotada 27/03/2022 30",
          "filename": "dsc-0335.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0338.jpg",
          "alt": "Sortida Calçotada 27/03/2022 31",
          "filename": "dsc-0338.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/dsc-0339.jpg",
          "alt": "Sortida Calçotada 27/03/2022 32",
          "filename": "dsc-0339.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Calsotada_27_03_22/img-2978.jpg",
          "alt": "Sortida Calçotada 27/03/2022 33",
          "filename": "img-2978.jpg"
        }
      ]
    },
    {
      "title": "Tour Auto 24 al 30/04/2022",
      "sourceFolder": "phocagallery/historiques/Tour_auto_2022_24_04_30_04",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Tour_auto_2022_24_04_30_04/dsc_0343.jpg",
          "alt": "Tour Auto 24 al 30/04/2022 1",
          "filename": "dsc_0343.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Tour_auto_2022_24_04_30_04/dsc_0346.jpg",
          "alt": "Tour Auto 24 al 30/04/2022 2",
          "filename": "dsc_0346.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Tour_auto_2022_24_04_30_04/dsc_0357.jpg",
          "alt": "Tour Auto 24 al 30/04/2022 3",
          "filename": "dsc_0357.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Tour_auto_2022_24_04_30_04/dsc_0363.jpg",
          "alt": "Tour Auto 24 al 30/04/2022 4",
          "filename": "dsc_0363.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Tour_auto_2022_24_04_30_04/dsc_0364.jpg",
          "alt": "Tour Auto 24 al 30/04/2022 5",
          "filename": "dsc_0364.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Tour_auto_2022_24_04_30_04/dsc_0410.jpg",
          "alt": "Tour Auto 24 al 30/04/2022 6",
          "filename": "dsc_0410.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Tour_auto_2022_24_04_30_04/dsc_0413.jpg",
          "alt": "Tour Auto 24 al 30/04/2022 7",
          "filename": "dsc_0413.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Tour_auto_2022_24_04_30_04/img-4219.jpg",
          "alt": "Tour Auto 24 al 30/04/2022 8",
          "filename": "img-4219.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Tour_auto_2022_24_04_30_04/img-4231.jpg",
          "alt": "Tour Auto 24 al 30/04/2022 9",
          "filename": "img-4231.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Tour_auto_2022_24_04_30_04/imgp2370.jpg",
          "alt": "Tour Auto 24 al 30/04/2022 10",
          "filename": "imgp2370.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Tour_auto_2022_24_04_30_04/imgp2371.jpg",
          "alt": "Tour Auto 24 al 30/04/2022 11",
          "filename": "imgp2371.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Tour_auto_2022_24_04_30_04/imgp2385.jpg",
          "alt": "Tour Auto 24 al 30/04/2022 12",
          "filename": "imgp2385.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Tour_auto_2022_24_04_30_04/imgp2387.jpg",
          "alt": "Tour Auto 24 al 30/04/2022 13",
          "filename": "imgp2387.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Tour_auto_2022_24_04_30_04/imgp2393.jpg",
          "alt": "Tour Auto 24 al 30/04/2022 14",
          "filename": "imgp2393.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Tour_auto_2022_24_04_30_04/imgp2405.jpg",
          "alt": "Tour Auto 24 al 30/04/2022 15",
          "filename": "imgp2405.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Tour_auto_2022_24_04_30_04/imgp2407.jpg",
          "alt": "Tour Auto 24 al 30/04/2022 16",
          "filename": "imgp2407.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Tour_auto_2022_24_04_30_04/imgp2414.jpg",
          "alt": "Tour Auto 24 al 30/04/2022 17",
          "filename": "imgp2414.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Tour_auto_2022_24_04_30_04/imgp2484.jpg",
          "alt": "Tour Auto 24 al 30/04/2022 18",
          "filename": "imgp2484.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Tour_auto_2022_24_04_30_04/imgp2486.jpg",
          "alt": "Tour Auto 24 al 30/04/2022 19",
          "filename": "imgp2486.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Tour_auto_2022_24_04_30_04/imgp2494.jpg",
          "alt": "Tour Auto 24 al 30/04/2022 20",
          "filename": "imgp2494.jpg"
        }
      ]
    },
    {
      "title": "Sortida França 15/05/2022",
      "sourceFolder": "phocagallery/historiques/Sortida_Franca_15_05_22",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0426.jpg",
          "alt": "Sortida França 15/05/2022 1",
          "filename": "dsc_0426.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0427.jpg",
          "alt": "Sortida França 15/05/2022 2",
          "filename": "dsc_0427.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0429.jpg",
          "alt": "Sortida França 15/05/2022 3",
          "filename": "dsc_0429.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0431.jpg",
          "alt": "Sortida França 15/05/2022 4",
          "filename": "dsc_0431.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0432.jpg",
          "alt": "Sortida França 15/05/2022 5",
          "filename": "dsc_0432.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0433.jpg",
          "alt": "Sortida França 15/05/2022 6",
          "filename": "dsc_0433.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0434.jpg",
          "alt": "Sortida França 15/05/2022 7",
          "filename": "dsc_0434.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0435.jpg",
          "alt": "Sortida França 15/05/2022 8",
          "filename": "dsc_0435.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0436.jpg",
          "alt": "Sortida França 15/05/2022 9",
          "filename": "dsc_0436.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0437.jpg",
          "alt": "Sortida França 15/05/2022 10",
          "filename": "dsc_0437.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0438.jpg",
          "alt": "Sortida França 15/05/2022 11",
          "filename": "dsc_0438.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0440.jpg",
          "alt": "Sortida França 15/05/2022 12",
          "filename": "dsc_0440.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0441.jpg",
          "alt": "Sortida França 15/05/2022 13",
          "filename": "dsc_0441.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0442.jpg",
          "alt": "Sortida França 15/05/2022 14",
          "filename": "dsc_0442.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0443.jpg",
          "alt": "Sortida França 15/05/2022 15",
          "filename": "dsc_0443.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0445.jpg",
          "alt": "Sortida França 15/05/2022 16",
          "filename": "dsc_0445.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0446.jpg",
          "alt": "Sortida França 15/05/2022 17",
          "filename": "dsc_0446.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0447.jpg",
          "alt": "Sortida França 15/05/2022 18",
          "filename": "dsc_0447.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0448.jpg",
          "alt": "Sortida França 15/05/2022 19",
          "filename": "dsc_0448.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0449.jpg",
          "alt": "Sortida França 15/05/2022 20",
          "filename": "dsc_0449.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0450.jpg",
          "alt": "Sortida França 15/05/2022 21",
          "filename": "dsc_0450.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0451.jpg",
          "alt": "Sortida França 15/05/2022 22",
          "filename": "dsc_0451.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0452.jpg",
          "alt": "Sortida França 15/05/2022 23",
          "filename": "dsc_0452.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0453.jpg",
          "alt": "Sortida França 15/05/2022 24",
          "filename": "dsc_0453.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0454.jpg",
          "alt": "Sortida França 15/05/2022 25",
          "filename": "dsc_0454.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0458.jpg",
          "alt": "Sortida França 15/05/2022 26",
          "filename": "dsc_0458.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0459.jpg",
          "alt": "Sortida França 15/05/2022 27",
          "filename": "dsc_0459.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0460.jpg",
          "alt": "Sortida França 15/05/2022 28",
          "filename": "dsc_0460.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0461.jpg",
          "alt": "Sortida França 15/05/2022 29",
          "filename": "dsc_0461.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0462.jpg",
          "alt": "Sortida França 15/05/2022 30",
          "filename": "dsc_0462.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0463.jpg",
          "alt": "Sortida França 15/05/2022 31",
          "filename": "dsc_0463.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0464.jpg",
          "alt": "Sortida França 15/05/2022 32",
          "filename": "dsc_0464.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0465.jpg",
          "alt": "Sortida França 15/05/2022 33",
          "filename": "dsc_0465.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0466.jpg",
          "alt": "Sortida França 15/05/2022 34",
          "filename": "dsc_0466.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0467.jpg",
          "alt": "Sortida França 15/05/2022 35",
          "filename": "dsc_0467.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0468.jpg",
          "alt": "Sortida França 15/05/2022 36",
          "filename": "dsc_0468.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0469.jpg",
          "alt": "Sortida França 15/05/2022 37",
          "filename": "dsc_0469.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0470.jpg",
          "alt": "Sortida França 15/05/2022 38",
          "filename": "dsc_0470.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0471.jpg",
          "alt": "Sortida França 15/05/2022 39",
          "filename": "dsc_0471.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0472.jpg",
          "alt": "Sortida França 15/05/2022 40",
          "filename": "dsc_0472.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0473.jpg",
          "alt": "Sortida França 15/05/2022 41",
          "filename": "dsc_0473.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0474.jpg",
          "alt": "Sortida França 15/05/2022 42",
          "filename": "dsc_0474.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0475.jpg",
          "alt": "Sortida França 15/05/2022 43",
          "filename": "dsc_0475.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0476.jpg",
          "alt": "Sortida França 15/05/2022 44",
          "filename": "dsc_0476.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0477.jpg",
          "alt": "Sortida França 15/05/2022 45",
          "filename": "dsc_0477.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0478.jpg",
          "alt": "Sortida França 15/05/2022 46",
          "filename": "dsc_0478.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0480.jpg",
          "alt": "Sortida França 15/05/2022 47",
          "filename": "dsc_0480.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0481.jpg",
          "alt": "Sortida França 15/05/2022 48",
          "filename": "dsc_0481.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0494.jpg",
          "alt": "Sortida França 15/05/2022 49",
          "filename": "dsc_0494.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0496.jpg",
          "alt": "Sortida França 15/05/2022 50",
          "filename": "dsc_0496.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0497.jpg",
          "alt": "Sortida França 15/05/2022 51",
          "filename": "dsc_0497.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Franca_15_05_22/dsc_0498.jpg",
          "alt": "Sortida França 15/05/2022 52",
          "filename": "dsc_0498.jpg"
        }
      ]
    },
    {
      "title": "Sortida Andorra 19/06/2022",
      "sourceFolder": "phocagallery/historiques/Sortida_Andorra_19_06_22",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Andorra_19_06_22/2c3253f9-3736-4d4a-8000-7c26eeef63e4.jpg",
          "alt": "Sortida Andorra 19/06/2022 1",
          "filename": "2c3253f9-3736-4d4a-8000-7c26eeef63e4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Andorra_19_06_22/img-5593.jpg",
          "alt": "Sortida Andorra 19/06/2022 2",
          "filename": "img-5593.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Andorra_19_06_22/img-5595.jpg",
          "alt": "Sortida Andorra 19/06/2022 3",
          "filename": "img-5595.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Andorra_19_06_22/img-5597.jpg",
          "alt": "Sortida Andorra 19/06/2022 4",
          "filename": "img-5597.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Andorra_19_06_22/img-5599.jpg",
          "alt": "Sortida Andorra 19/06/2022 5",
          "filename": "img-5599.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Andorra_19_06_22/img-5601.jpg",
          "alt": "Sortida Andorra 19/06/2022 6",
          "filename": "img-5601.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Andorra_19_06_22/img-5603.jpg",
          "alt": "Sortida Andorra 19/06/2022 7",
          "filename": "img-5603.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Andorra_19_06_22/img-5606.jpg",
          "alt": "Sortida Andorra 19/06/2022 8",
          "filename": "img-5606.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Andorra_19_06_22/img-5612.jpg",
          "alt": "Sortida Andorra 19/06/2022 9",
          "filename": "img-5612.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Andorra_19_06_22/img-5613.jpg",
          "alt": "Sortida Andorra 19/06/2022 10",
          "filename": "img-5613.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Andorra_19_06_22/img-5614.jpg",
          "alt": "Sortida Andorra 19/06/2022 11",
          "filename": "img-5614.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Andorra_19_06_22/img-5615.jpg",
          "alt": "Sortida Andorra 19/06/2022 12",
          "filename": "img-5615.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Andorra_19_06_22/img-5619.jpg",
          "alt": "Sortida Andorra 19/06/2022 13",
          "filename": "img-5619.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Andorra_19_06_22/img-5620.jpg",
          "alt": "Sortida Andorra 19/06/2022 14",
          "filename": "img-5620.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Andorra_19_06_22/img-5626.jpg",
          "alt": "Sortida Andorra 19/06/2022 15",
          "filename": "img-5626.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Andorra_19_06_22/img-5630.jpg",
          "alt": "Sortida Andorra 19/06/2022 16",
          "filename": "img-5630.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Andorra_19_06_22/img-5635.jpg",
          "alt": "Sortida Andorra 19/06/2022 17",
          "filename": "img-5635.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Andorra_19_06_22/img-5639.jpg",
          "alt": "Sortida Andorra 19/06/2022 18",
          "filename": "img-5639.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Andorra_19_06_22/img-5640.jpg",
          "alt": "Sortida Andorra 19/06/2022 19",
          "filename": "img-5640.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/historiques/Sortida_Andorra_19_06_22/img-5644.jpg",
          "alt": "Sortida Andorra 19/06/2022 20",
          "filename": "img-5644.jpg"
        }
      ]
    },
    {
      "title": "Rally Turístic 01/10/2022",
      "sourceFolder": "phocagallery",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/img_8903.jpg",
          "alt": "Rally Turístic 01/10/2022 1",
          "filename": "img_8903.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img_8904.jpg",
          "alt": "Rally Turístic 01/10/2022 2",
          "filename": "img_8904.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img_8907.jpg",
          "alt": "Rally Turístic 01/10/2022 3",
          "filename": "img_8907.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img_8911.jpg",
          "alt": "Rally Turístic 01/10/2022 4",
          "filename": "img_8911.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img_8914.jpg",
          "alt": "Rally Turístic 01/10/2022 5",
          "filename": "img_8914.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img_8915.jpg",
          "alt": "Rally Turístic 01/10/2022 6",
          "filename": "img_8915.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img_8918.jpg",
          "alt": "Rally Turístic 01/10/2022 7",
          "filename": "img_8918.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img_8984.jpg",
          "alt": "Rally Turístic 01/10/2022 8",
          "filename": "img_8984.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img_8987.jpg",
          "alt": "Rally Turístic 01/10/2022 9",
          "filename": "img_8987.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img_8990.jpg",
          "alt": "Rally Turístic 01/10/2022 10",
          "filename": "img_8990.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img_8992.jpg",
          "alt": "Rally Turístic 01/10/2022 11",
          "filename": "img_8992.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img_8995.jpg",
          "alt": "Rally Turístic 01/10/2022 12",
          "filename": "img_8995.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img_8999.jpg",
          "alt": "Rally Turístic 01/10/2022 13",
          "filename": "img_8999.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img_9010.jpg",
          "alt": "Rally Turístic 01/10/2022 14",
          "filename": "img_9010.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img_9019.jpg",
          "alt": "Rally Turístic 01/10/2022 15",
          "filename": "img_9019.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img_9021.jpg",
          "alt": "Rally Turístic 01/10/2022 16",
          "filename": "img_9021.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img_9024.jpg",
          "alt": "Rally Turístic 01/10/2022 17",
          "filename": "img_9024.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img_9028.jpg",
          "alt": "Rally Turístic 01/10/2022 18",
          "filename": "img_9028.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img_9029.jpg",
          "alt": "Rally Turístic 01/10/2022 19",
          "filename": "img_9029.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img_9048.jpg",
          "alt": "Rally Turístic 01/10/2022 20",
          "filename": "img_9048.jpg"
        }
      ]
    },
    {
      "title": "Cloenda 13/11/2022",
      "sourceFolder": "phocagallery/sortides (origen) → classificat a històriques/2022",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/img-0159.jpg",
          "alt": "Cloenda 13/11/2022 1",
          "filename": "img-0159.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/91fbd5de-c6aa-4015-9bf3-aa6a71b4a618.jpg",
          "alt": "Cloenda 13/11/2022 2",
          "filename": "91fbd5de-c6aa-4015-9bf3-aa6a71b4a618.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/f330e16d-9d12-4541-8ee1-566d836b454f.jpg",
          "alt": "Cloenda 13/11/2022 3",
          "filename": "f330e16d-9d12-4541-8ee1-566d836b454f.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/foto_no_exif.jpg",
          "alt": "Cloenda 13/11/2022 4",
          "filename": "foto_no_exif.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/foto_no_exif_1.jpg",
          "alt": "Cloenda 13/11/2022 5",
          "filename": "foto_no_exif_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/foto_no_exif_2.jpg",
          "alt": "Cloenda 13/11/2022 6",
          "filename": "foto_no_exif_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/foto_no_exif_3.jpg",
          "alt": "Cloenda 13/11/2022 7",
          "filename": "foto_no_exif_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/foto_no_exif_4.jpg",
          "alt": "Cloenda 13/11/2022 8",
          "filename": "foto_no_exif_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img-0151.jpg",
          "alt": "Cloenda 13/11/2022 9",
          "filename": "img-0151.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img-0154.jpg",
          "alt": "Cloenda 13/11/2022 10",
          "filename": "img-0154.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img-0155.jpg",
          "alt": "Cloenda 13/11/2022 11",
          "filename": "img-0155.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/img-0158.jpg",
          "alt": "Cloenda 13/11/2022 12",
          "filename": "img-0158.jpg"
        }
      ],
      "note": "Agrupat amb EXIF 2022-11-13 i coincidència visual."
    }
  ],
  "sortides_2024": [
    {
      "title": "Esmorzar 25/02/2024",
      "sourceFolder": "phocagallery/sortides (origen)",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-02-25-14-39-37.jpg",
          "alt": "Esmorzar 25/02/2024 1",
          "filename": "photo-2024-02-25-14-39-37.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-02-25-14-39-37_1.jpg",
          "alt": "Esmorzar 25/02/2024 2",
          "filename": "photo-2024-02-25-14-39-37_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-02-25-14-39-42.jpg",
          "alt": "Esmorzar 25/02/2024 3",
          "filename": "photo-2024-02-25-14-39-42.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-02-25-14-39-44.jpg",
          "alt": "Esmorzar 25/02/2024 4",
          "filename": "photo-2024-02-25-14-39-44.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-02-25-14-39-51.jpg",
          "alt": "Esmorzar 25/02/2024 5",
          "filename": "photo-2024-02-25-14-39-51.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-02-25-14-39-52.jpg",
          "alt": "Esmorzar 25/02/2024 6",
          "filename": "photo-2024-02-25-14-39-52.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-02-25-14-39-54.jpg",
          "alt": "Esmorzar 25/02/2024 7",
          "filename": "photo-2024-02-25-14-39-54.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-02-25-14-39-54_1.jpg",
          "alt": "Esmorzar 25/02/2024 8",
          "filename": "photo-2024-02-25-14-39-54_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-02-25-14-39-54_2.jpg",
          "alt": "Esmorzar 25/02/2024 9",
          "filename": "photo-2024-02-25-14-39-54_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-02-25-14-39-54_3.jpg",
          "alt": "Esmorzar 25/02/2024 10",
          "filename": "photo-2024-02-25-14-39-54_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-02-25-14-39-54_4.jpg",
          "alt": "Esmorzar 25/02/2024 11",
          "filename": "photo-2024-02-25-14-39-54_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-02-25-14-39-54_5.jpg",
          "alt": "Esmorzar 25/02/2024 12",
          "filename": "photo-2024-02-25-14-39-54_5.jpg"
        }
      ]
    },
    {
      "title": "Sortida a Espanya 24/03/2024",
      "sourceFolder": "phocagallery/sortides (origen)",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-04-02-09-31-06.jpg",
          "alt": "Sortida a Espanya 24/03/2024 1",
          "filename": "photo-2024-04-02-09-31-06.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-04-02-09-31-06_1.jpg",
          "alt": "Sortida a Espanya 24/03/2024 2",
          "filename": "photo-2024-04-02-09-31-06_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-04-02-09-31-06_2.jpg",
          "alt": "Sortida a Espanya 24/03/2024 3",
          "filename": "photo-2024-04-02-09-31-06_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-04-02-09-31-06_3.jpg",
          "alt": "Sortida a Espanya 24/03/2024 4",
          "filename": "photo-2024-04-02-09-31-06_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-04-02-09-31-06_4.jpg",
          "alt": "Sortida a Espanya 24/03/2024 5",
          "filename": "photo-2024-04-02-09-31-06_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-04-02-09-31-07.jpg",
          "alt": "Sortida a Espanya 24/03/2024 6",
          "filename": "photo-2024-04-02-09-31-07.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-04-02-09-31-07_1.jpg",
          "alt": "Sortida a Espanya 24/03/2024 7",
          "filename": "photo-2024-04-02-09-31-07_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-04-02-09-31-07_2.jpg",
          "alt": "Sortida a Espanya 24/03/2024 8",
          "filename": "photo-2024-04-02-09-31-07_2.jpg"
        }
      ],
      "note": "Recuperat segons data del fitxer origen."
    },
    {
      "title": "Esmorzar 21/04/2024",
      "sourceFolder": "phocagallery/sortides (origen)",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-04-23-10-03-31.jpg",
          "alt": "Esmorzar 21/04/2024 1",
          "filename": "photo-2024-04-23-10-03-31.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-04-23-10-03-31_1.jpg",
          "alt": "Esmorzar 21/04/2024 2",
          "filename": "photo-2024-04-23-10-03-31_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-04-23-10-03-31_2.jpg",
          "alt": "Esmorzar 21/04/2024 3",
          "filename": "photo-2024-04-23-10-03-31_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-04-23-10-03-31_3.jpg",
          "alt": "Esmorzar 21/04/2024 4",
          "filename": "photo-2024-04-23-10-03-31_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-04-23-10-03-31_4.jpg",
          "alt": "Esmorzar 21/04/2024 5",
          "filename": "photo-2024-04-23-10-03-31_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-04-23-10-03-31_5.jpg",
          "alt": "Esmorzar 21/04/2024 6",
          "filename": "photo-2024-04-23-10-03-31_5.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-04-23-10-03-31_6.jpg",
          "alt": "Esmorzar 21/04/2024 7",
          "filename": "photo-2024-04-23-10-03-31_6.jpg"
        }
      ],
      "note": "Recuperat segons data del fitxer origen."
    },
    {
      "title": "Sortida a França 12/05/2024",
      "sourceFolder": "phocagallery/sortides (origen)",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-05-13-07-14-49.jpg",
          "alt": "Sortida a França 12/05/2024 1",
          "filename": "photo-2024-05-13-07-14-49.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-05-13-07-14-50.jpg",
          "alt": "Sortida a França 12/05/2024 2",
          "filename": "photo-2024-05-13-07-14-50.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-05-13-07-14-50_1.jpg",
          "alt": "Sortida a França 12/05/2024 3",
          "filename": "photo-2024-05-13-07-14-50_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-05-13-07-14-50_2.jpg",
          "alt": "Sortida a França 12/05/2024 4",
          "filename": "photo-2024-05-13-07-14-50_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-05-13-07-14-50_3.jpg",
          "alt": "Sortida a França 12/05/2024 5",
          "filename": "photo-2024-05-13-07-14-50_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-05-13-07-14-50_4.jpg",
          "alt": "Sortida a França 12/05/2024 6",
          "filename": "photo-2024-05-13-07-14-50_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-05-13-07-14-50_5.jpg",
          "alt": "Sortida a França 12/05/2024 7",
          "filename": "photo-2024-05-13-07-14-50_5.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-05-13-07-14-50_6.jpg",
          "alt": "Sortida a França 12/05/2024 8",
          "filename": "photo-2024-05-13-07-14-50_6.jpg"
        }
      ],
      "note": "Recuperat segons data del fitxer origen."
    },
    {
      "title": "Esmorzar 09/06/2024",
      "sourceFolder": "phocagallery/sortides (origen)",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/PHOTO-2024-06-11-09-29-15%203.jpg",
          "alt": "Esmorzar 09/06/2024 1",
          "filename": "PHOTO-2024-06-11-09-29-15 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-06-11-09-29-13%201.jpg",
          "alt": "Esmorzar 09/06/2024 2",
          "filename": "photo-2024-06-11-09-29-13 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-06-11-09-29-13.jpg",
          "alt": "Esmorzar 09/06/2024 3",
          "filename": "photo-2024-06-11-09-29-13.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-06-11-09-29-14%201.jpg",
          "alt": "Esmorzar 09/06/2024 4",
          "filename": "photo-2024-06-11-09-29-14 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-06-11-09-29-14%202.jpg",
          "alt": "Esmorzar 09/06/2024 5",
          "filename": "photo-2024-06-11-09-29-14 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-06-11-09-29-14%203.jpg",
          "alt": "Esmorzar 09/06/2024 6",
          "filename": "photo-2024-06-11-09-29-14 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-06-11-09-29-14%204.jpg",
          "alt": "Esmorzar 09/06/2024 7",
          "filename": "photo-2024-06-11-09-29-14 4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-06-11-09-29-14%205.jpg",
          "alt": "Esmorzar 09/06/2024 8",
          "filename": "photo-2024-06-11-09-29-14 5.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-06-11-09-29-14.jpg",
          "alt": "Esmorzar 09/06/2024 9",
          "filename": "photo-2024-06-11-09-29-14.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-06-11-09-29-15%201.jpg",
          "alt": "Esmorzar 09/06/2024 10",
          "filename": "photo-2024-06-11-09-29-15 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-06-11-09-29-15%202.jpg",
          "alt": "Esmorzar 09/06/2024 11",
          "filename": "photo-2024-06-11-09-29-15 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-06-11-09-29-15%203.jpg",
          "alt": "Esmorzar 09/06/2024 12",
          "filename": "photo-2024-06-11-09-29-15 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-06-11-09-29-15.jpg",
          "alt": "Esmorzar 09/06/2024 13",
          "filename": "photo-2024-06-11-09-29-15.jpg"
        }
      ],
      "note": "Recuperat segons data del fitxer origen."
    },
    {
      "title": "Esmorzar 22/09/2024",
      "sourceFolder": "phocagallery/sortides (origen)",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-09-22-16-37-38%201.jpg",
          "alt": "Esmorzar 22/09/2024 1",
          "filename": "photo-2024-09-22-16-37-38 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-09-22-16-37-38%202.jpg",
          "alt": "Esmorzar 22/09/2024 2",
          "filename": "photo-2024-09-22-16-37-38 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-09-22-16-37-38%203.jpg",
          "alt": "Esmorzar 22/09/2024 3",
          "filename": "photo-2024-09-22-16-37-38 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-09-22-16-37-38%204.jpg",
          "alt": "Esmorzar 22/09/2024 4",
          "filename": "photo-2024-09-22-16-37-38 4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-09-22-16-37-38.jpg",
          "alt": "Esmorzar 22/09/2024 5",
          "filename": "photo-2024-09-22-16-37-38.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-09-22-16-37-39%201.jpg",
          "alt": "Esmorzar 22/09/2024 6",
          "filename": "photo-2024-09-22-16-37-39 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-09-22-16-37-39%202.jpg",
          "alt": "Esmorzar 22/09/2024 7",
          "filename": "photo-2024-09-22-16-37-39 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-09-22-16-37-39%203.jpg",
          "alt": "Esmorzar 22/09/2024 8",
          "filename": "photo-2024-09-22-16-37-39 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-09-22-16-37-39%204.jpg",
          "alt": "Esmorzar 22/09/2024 9",
          "filename": "photo-2024-09-22-16-37-39 4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-09-22-16-37-39.jpg",
          "alt": "Esmorzar 22/09/2024 10",
          "filename": "photo-2024-09-22-16-37-39.jpg"
        }
      ]
    },
    {
      "title": "V Ral·li Turístic Lloret 07/10/2024",
      "sourceFolder": "phocagallery/sortides (origen)",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-10-07-13-42-27.jpg",
          "alt": "V Ral·li Turístic Lloret 07/10/2024 1",
          "filename": "photo-2024-10-07-13-42-27.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-10-07-13-42-28.jpg",
          "alt": "V Ral·li Turístic Lloret 07/10/2024 2",
          "filename": "photo-2024-10-07-13-42-28.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-10-07-13-42-28_1.jpg",
          "alt": "V Ral·li Turístic Lloret 07/10/2024 3",
          "filename": "photo-2024-10-07-13-42-28_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-10-07-13-42-28_2.jpg",
          "alt": "V Ral·li Turístic Lloret 07/10/2024 4",
          "filename": "photo-2024-10-07-13-42-28_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-10-07-13-42-28_3.jpg",
          "alt": "V Ral·li Turístic Lloret 07/10/2024 5",
          "filename": "photo-2024-10-07-13-42-28_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-10-07-13-42-28_4.jpg",
          "alt": "V Ral·li Turístic Lloret 07/10/2024 6",
          "filename": "photo-2024-10-07-13-42-28_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-10-07-13-42-28_5.jpg",
          "alt": "V Ral·li Turístic Lloret 07/10/2024 7",
          "filename": "photo-2024-10-07-13-42-28_5.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-10-07-13-42-29.jpg",
          "alt": "V Ral·li Turístic Lloret 07/10/2024 8",
          "filename": "photo-2024-10-07-13-42-29.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-10-07-13-42-29_1.jpg",
          "alt": "V Ral·li Turístic Lloret 07/10/2024 9",
          "filename": "photo-2024-10-07-13-42-29_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-10-07-13-42-29_2.jpg",
          "alt": "V Ral·li Turístic Lloret 07/10/2024 10",
          "filename": "photo-2024-10-07-13-42-29_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-10-07-13-42-29_3.jpg",
          "alt": "V Ral·li Turístic Lloret 07/10/2024 11",
          "filename": "photo-2024-10-07-13-42-29_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-10-07-13-42-29_4.jpg",
          "alt": "V Ral·li Turístic Lloret 07/10/2024 12",
          "filename": "photo-2024-10-07-13-42-29_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-10-07-13-42-30.jpg",
          "alt": "V Ral·li Turístic Lloret 07/10/2024 13",
          "filename": "photo-2024-10-07-13-42-30.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-10-07-13-42-30_1.jpg",
          "alt": "V Ral·li Turístic Lloret 07/10/2024 14",
          "filename": "photo-2024-10-07-13-42-30_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-10-07-13-42-30_2.jpg",
          "alt": "V Ral·li Turístic Lloret 07/10/2024 15",
          "filename": "photo-2024-10-07-13-42-30_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-10-07-13-42-30_3.jpg",
          "alt": "V Ral·li Turístic Lloret 07/10/2024 16",
          "filename": "photo-2024-10-07-13-42-30_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-10-07-13-42-30_4.jpg",
          "alt": "V Ral·li Turístic Lloret 07/10/2024 17",
          "filename": "photo-2024-10-07-13-42-30_4.jpg"
        }
      ]
    },
    {
      "title": "Cloenda 11/11/2024",
      "sourceFolder": "phocagallery/sortides (origen)",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-11-11-09-49-36.jpg",
          "alt": "Cloenda 11/11/2024 1",
          "filename": "photo-2024-11-11-09-49-36.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-11-11-09-49-36_1.jpg",
          "alt": "Cloenda 11/11/2024 2",
          "filename": "photo-2024-11-11-09-49-36_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-11-11-09-49-36_2.jpg",
          "alt": "Cloenda 11/11/2024 3",
          "filename": "photo-2024-11-11-09-49-36_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-11-11-09-49-36_3.jpg",
          "alt": "Cloenda 11/11/2024 4",
          "filename": "photo-2024-11-11-09-49-36_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-11-11-09-49-37.jpg",
          "alt": "Cloenda 11/11/2024 5",
          "filename": "photo-2024-11-11-09-49-37.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-11-11-09-49-37_1.jpg",
          "alt": "Cloenda 11/11/2024 6",
          "filename": "photo-2024-11-11-09-49-37_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-11-11-09-49-37_2.jpg",
          "alt": "Cloenda 11/11/2024 7",
          "filename": "photo-2024-11-11-09-49-37_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-11-11-09-49-37_3.jpg",
          "alt": "Cloenda 11/11/2024 8",
          "filename": "photo-2024-11-11-09-49-37_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-11-11-09-49-37_4.jpg",
          "alt": "Cloenda 11/11/2024 9",
          "filename": "photo-2024-11-11-09-49-37_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-11-11-09-49-37_5.jpg",
          "alt": "Cloenda 11/11/2024 10",
          "filename": "photo-2024-11-11-09-49-37_5.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-11-11-09-49-37_6.jpg",
          "alt": "Cloenda 11/11/2024 11",
          "filename": "photo-2024-11-11-09-49-37_6.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/photo-2024-11-11-09-49-38.jpg",
          "alt": "Cloenda 11/11/2024 12",
          "filename": "photo-2024-11-11-09-49-38.jpg"
        }
      ]
    }
  ],
  "sortides_2025": [
    {
      "title": "Cars & Coffee 23/02/2025",
      "sourceFolder": "phocagallery/sortides/Any_2025",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-02-25-09-00-41.jpg",
          "alt": "Cars & Coffee 23/02/2025 1",
          "filename": "photo-2025-02-25-09-00-41.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-02-25-09-00-41_1.jpg",
          "alt": "Cars & Coffee 23/02/2025 2",
          "filename": "photo-2025-02-25-09-00-41_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-02-25-09-00-41_2.jpg",
          "alt": "Cars & Coffee 23/02/2025 3",
          "filename": "photo-2025-02-25-09-00-41_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-02-25-09-00-41_3.jpg",
          "alt": "Cars & Coffee 23/02/2025 4",
          "filename": "photo-2025-02-25-09-00-41_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-02-25-09-00-42.jpg",
          "alt": "Cars & Coffee 23/02/2025 5",
          "filename": "photo-2025-02-25-09-00-42.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-02-25-09-00-42_1.jpg",
          "alt": "Cars & Coffee 23/02/2025 6",
          "filename": "photo-2025-02-25-09-00-42_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-02-25-09-00-42_2.jpg",
          "alt": "Cars & Coffee 23/02/2025 7",
          "filename": "photo-2025-02-25-09-00-42_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-02-25-09-00-42_3.jpg",
          "alt": "Cars & Coffee 23/02/2025 8",
          "filename": "photo-2025-02-25-09-00-42_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-02-25-09-00-42_4.jpg",
          "alt": "Cars & Coffee 23/02/2025 9",
          "filename": "photo-2025-02-25-09-00-42_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-02-25-09-01-09.jpg",
          "alt": "Cars & Coffee 23/02/2025 10",
          "filename": "photo-2025-02-25-09-01-09.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-02-25-09-01-09_1.jpg",
          "alt": "Cars & Coffee 23/02/2025 11",
          "filename": "photo-2025-02-25-09-01-09_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-02-25-09-01-09_2.jpg",
          "alt": "Cars & Coffee 23/02/2025 12",
          "filename": "photo-2025-02-25-09-01-09_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-02-25-09-01-10.jpg",
          "alt": "Cars & Coffee 23/02/2025 13",
          "filename": "photo-2025-02-25-09-01-10.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-02-25-09-01-55.jpg",
          "alt": "Cars & Coffee 23/02/2025 14",
          "filename": "photo-2025-02-25-09-01-55.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-02-25-09-33-55.jpg",
          "alt": "Cars & Coffee 23/02/2025 15",
          "filename": "photo-2025-02-25-09-33-55.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-02-25-09-35-59.jpg",
          "alt": "Cars & Coffee 23/02/2025 16",
          "filename": "photo-2025-02-25-09-35-59.jpg"
        }
      ],
      "note": "Recuperat segons data del fitxer origen."
    },
    {
      "title": "Sortida a Espanya 30/03/2025",
      "sourceFolder": "phocagallery/sortides/Any_2025",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-30-19-13-28.jpg",
          "alt": "Sortida a Espanya 30/03/2025 1",
          "filename": "photo-2025-03-30-19-13-28.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-30-19-13-29.jpg",
          "alt": "Sortida a Espanya 30/03/2025 2",
          "filename": "photo-2025-03-30-19-13-29.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-30-19-13-29_1.jpg",
          "alt": "Sortida a Espanya 30/03/2025 3",
          "filename": "photo-2025-03-30-19-13-29_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-30-19-13-29_2.jpg",
          "alt": "Sortida a Espanya 30/03/2025 4",
          "filename": "photo-2025-03-30-19-13-29_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-30-19-13-29_3.jpg",
          "alt": "Sortida a Espanya 30/03/2025 5",
          "filename": "photo-2025-03-30-19-13-29_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-30-19-13-29_4.jpg",
          "alt": "Sortida a Espanya 30/03/2025 6",
          "filename": "photo-2025-03-30-19-13-29_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-30-19-13-29_5.jpg",
          "alt": "Sortida a Espanya 30/03/2025 7",
          "filename": "photo-2025-03-30-19-13-29_5.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-31-09-17-39.jpg",
          "alt": "Sortida a Espanya 30/03/2025 8",
          "filename": "photo-2025-03-31-09-17-39.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-31-09-17-40.jpg",
          "alt": "Sortida a Espanya 30/03/2025 9",
          "filename": "photo-2025-03-31-09-17-40.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-31-09-17-40_1.jpg",
          "alt": "Sortida a Espanya 30/03/2025 10",
          "filename": "photo-2025-03-31-09-17-40_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-31-09-17-40_2.jpg",
          "alt": "Sortida a Espanya 30/03/2025 11",
          "filename": "photo-2025-03-31-09-17-40_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-31-09-17-40_3.jpg",
          "alt": "Sortida a Espanya 30/03/2025 12",
          "filename": "photo-2025-03-31-09-17-40_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-31-09-17-40_4.jpg",
          "alt": "Sortida a Espanya 30/03/2025 13",
          "filename": "photo-2025-03-31-09-17-40_4.jpg"
        }
      ]
    },
    {
      "title": "Cars & Coffee 13/04/2025",
      "sourceFolder": "phocagallery/sortides/Any_2025",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-04-13-13-06-46.jpg",
          "alt": "Cars & Coffee 13/04/2025 1",
          "filename": "photo-2025-04-13-13-06-46.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-04-13-13-06-46_1.jpg",
          "alt": "Cars & Coffee 13/04/2025 2",
          "filename": "photo-2025-04-13-13-06-46_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-04-13-13-06-46_2.jpg",
          "alt": "Cars & Coffee 13/04/2025 3",
          "filename": "photo-2025-04-13-13-06-46_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-04-13-13-06-46_3.jpg",
          "alt": "Cars & Coffee 13/04/2025 4",
          "filename": "photo-2025-04-13-13-06-46_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-04-13-13-06-46_4.jpg",
          "alt": "Cars & Coffee 13/04/2025 5",
          "filename": "photo-2025-04-13-13-06-46_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-04-13-13-06-46_5.jpg",
          "alt": "Cars & Coffee 13/04/2025 6",
          "filename": "photo-2025-04-13-13-06-46_5.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-04-13-13-06-46_6.jpg",
          "alt": "Cars & Coffee 13/04/2025 7",
          "filename": "photo-2025-04-13-13-06-46_6.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-04-13-13-06-47.jpg",
          "alt": "Cars & Coffee 13/04/2025 8",
          "filename": "photo-2025-04-13-13-06-47.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-04-13-13-06-47_1.jpg",
          "alt": "Cars & Coffee 13/04/2025 9",
          "filename": "photo-2025-04-13-13-06-47_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-04-13-13-06-47_2.jpg",
          "alt": "Cars & Coffee 13/04/2025 10",
          "filename": "photo-2025-04-13-13-06-47_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-04-13-13-06-47_3.jpg",
          "alt": "Cars & Coffee 13/04/2025 11",
          "filename": "photo-2025-04-13-13-06-47_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-04-13-13-06-47_4.jpg",
          "alt": "Cars & Coffee 13/04/2025 12",
          "filename": "photo-2025-04-13-13-06-47_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-04-13-13-06-47_5.jpg",
          "alt": "Cars & Coffee 13/04/2025 13",
          "filename": "photo-2025-04-13-13-06-47_5.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-04-13-13-06-47_6.jpg",
          "alt": "Cars & Coffee 13/04/2025 14",
          "filename": "photo-2025-04-13-13-06-47_6.jpg"
        }
      ]
    },
    {
      "title": "Sortida a França 18/05/2025",
      "sourceFolder": "phocagallery/sortides/Any_2025",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-20-10.jpg",
          "alt": "Sortida a França 18/05/2025 1",
          "filename": "photo-2025-05-19-16-20-10.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-20-10_1.jpg",
          "alt": "Sortida a França 18/05/2025 2",
          "filename": "photo-2025-05-19-16-20-10_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-20-10_2.jpg",
          "alt": "Sortida a França 18/05/2025 3",
          "filename": "photo-2025-05-19-16-20-10_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-20-10_3.jpg",
          "alt": "Sortida a França 18/05/2025 4",
          "filename": "photo-2025-05-19-16-20-10_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-20-11.jpg",
          "alt": "Sortida a França 18/05/2025 5",
          "filename": "photo-2025-05-19-16-20-11.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-20-11_1.jpg",
          "alt": "Sortida a França 18/05/2025 6",
          "filename": "photo-2025-05-19-16-20-11_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-20-11_2.jpg",
          "alt": "Sortida a França 18/05/2025 7",
          "filename": "photo-2025-05-19-16-20-11_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-20-11_3.jpg",
          "alt": "Sortida a França 18/05/2025 8",
          "filename": "photo-2025-05-19-16-20-11_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-20-11_4.jpg",
          "alt": "Sortida a França 18/05/2025 9",
          "filename": "photo-2025-05-19-16-20-11_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-20-11_5.jpg",
          "alt": "Sortida a França 18/05/2025 10",
          "filename": "photo-2025-05-19-16-20-11_5.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-20-59.jpg",
          "alt": "Sortida a França 18/05/2025 11",
          "filename": "photo-2025-05-19-16-20-59.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-20-59_1.jpg",
          "alt": "Sortida a França 18/05/2025 12",
          "filename": "photo-2025-05-19-16-20-59_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-20-59_2.jpg",
          "alt": "Sortida a França 18/05/2025 13",
          "filename": "photo-2025-05-19-16-20-59_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-21-00.jpg",
          "alt": "Sortida a França 18/05/2025 14",
          "filename": "photo-2025-05-19-16-21-00.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-21-00_1.jpg",
          "alt": "Sortida a França 18/05/2025 15",
          "filename": "photo-2025-05-19-16-21-00_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-21-00_2.jpg",
          "alt": "Sortida a França 18/05/2025 16",
          "filename": "photo-2025-05-19-16-21-00_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-21-00_3.jpg",
          "alt": "Sortida a França 18/05/2025 17",
          "filename": "photo-2025-05-19-16-21-00_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-21-00_4.jpg",
          "alt": "Sortida a França 18/05/2025 18",
          "filename": "photo-2025-05-19-16-21-00_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-21-00_5.jpg",
          "alt": "Sortida a França 18/05/2025 19",
          "filename": "photo-2025-05-19-16-21-00_5.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-21-00_6.jpg",
          "alt": "Sortida a França 18/05/2025 20",
          "filename": "photo-2025-05-19-16-21-00_6.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-21-01.jpg",
          "alt": "Sortida a França 18/05/2025 21",
          "filename": "photo-2025-05-19-16-21-01.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-21-01_1.jpg",
          "alt": "Sortida a França 18/05/2025 22",
          "filename": "photo-2025-05-19-16-21-01_1.jpg"
        }
      ],
      "note": "Recuperat segons data del fitxer origen."
    },
    {
      "title": "Cars & Coffee 22/06/2025",
      "sourceFolder": "phocagallery/sortides/Any_2025/Cars",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-06-24-15-02-05.jpg",
          "alt": "Cars & Coffee 22/06/2025 1",
          "filename": "photo-2025-06-24-15-02-05.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-06-24-15-02-05_1.jpg",
          "alt": "Cars & Coffee 22/06/2025 2",
          "filename": "photo-2025-06-24-15-02-05_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-06-24-15-02-05_2.jpg",
          "alt": "Cars & Coffee 22/06/2025 3",
          "filename": "photo-2025-06-24-15-02-05_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-06-24-15-02-05_3.jpg",
          "alt": "Cars & Coffee 22/06/2025 4",
          "filename": "photo-2025-06-24-15-02-05_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-06-24-15-02-05_4.jpg",
          "alt": "Cars & Coffee 22/06/2025 5",
          "filename": "photo-2025-06-24-15-02-05_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-06-24-15-02-05_5.jpg",
          "alt": "Cars & Coffee 22/06/2025 6",
          "filename": "photo-2025-06-24-15-02-05_5.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-06-24-15-02-05_6.jpg",
          "alt": "Cars & Coffee 22/06/2025 7",
          "filename": "photo-2025-06-24-15-02-05_6.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-06-24-15-02-06.jpg",
          "alt": "Cars & Coffee 22/06/2025 8",
          "filename": "photo-2025-06-24-15-02-06.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-06-24-15-04-17.jpg",
          "alt": "Cars & Coffee 22/06/2025 9",
          "filename": "photo-2025-06-24-15-04-17.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-06-24-15-04-17_1.jpg",
          "alt": "Cars & Coffee 22/06/2025 10",
          "filename": "photo-2025-06-24-15-04-17_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-06-24-15-04-17_2.jpg",
          "alt": "Cars & Coffee 22/06/2025 11",
          "filename": "photo-2025-06-24-15-04-17_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-06-24-15-04-17_3.jpg",
          "alt": "Cars & Coffee 22/06/2025 12",
          "filename": "photo-2025-06-24-15-04-17_3.jpg"
        }
      ]
    },
    {
      "title": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025",
      "sourceFolder": "phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-21-26.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 1",
          "filename": "photo-2025-07-09-08-21-26.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-21-26_1.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 2",
          "filename": "photo-2025-07-09-08-21-26_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-21-26_2.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 3",
          "filename": "photo-2025-07-09-08-21-26_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-21-26_3.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 4",
          "filename": "photo-2025-07-09-08-21-26_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-21-27.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 5",
          "filename": "photo-2025-07-09-08-21-27.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-21-27_1.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 6",
          "filename": "photo-2025-07-09-08-21-27_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-21-27_2.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 7",
          "filename": "photo-2025-07-09-08-21-27_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-22-32.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 8",
          "filename": "photo-2025-07-09-08-22-32.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-22-33.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 9",
          "filename": "photo-2025-07-09-08-22-33.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-22-33_1.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 10",
          "filename": "photo-2025-07-09-08-22-33_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-22-33_2.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 11",
          "filename": "photo-2025-07-09-08-22-33_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-22-33_3.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 12",
          "filename": "photo-2025-07-09-08-22-33_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-23-30.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 13",
          "filename": "photo-2025-07-09-08-23-30.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-23-31.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 14",
          "filename": "photo-2025-07-09-08-23-31.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-23-31_1.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 15",
          "filename": "photo-2025-07-09-08-23-31_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-23-31_2.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 16",
          "filename": "photo-2025-07-09-08-23-31_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-23-31_3.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 17",
          "filename": "photo-2025-07-09-08-23-31_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-33-35.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 18",
          "filename": "photo-2025-07-09-08-33-35.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-33-36.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 19",
          "filename": "photo-2025-07-09-08-33-36.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-33-36_1.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 20",
          "filename": "photo-2025-07-09-08-33-36_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-33-36_2.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 21",
          "filename": "photo-2025-07-09-08-33-36_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-33-36_3.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 22",
          "filename": "photo-2025-07-09-08-33-36_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-33-37.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 23",
          "filename": "photo-2025-07-09-08-33-37.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-33-37_1.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 24",
          "filename": "photo-2025-07-09-08-33-37_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-33-37_2.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 25",
          "filename": "photo-2025-07-09-08-33-37_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-33-37_3.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 26",
          "filename": "photo-2025-07-09-08-33-37_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-34-26.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 27",
          "filename": "photo-2025-07-09-08-34-26.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-34-27.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 28",
          "filename": "photo-2025-07-09-08-34-27.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-34-27_1.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 29",
          "filename": "photo-2025-07-09-08-34-27_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-37-55.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 30",
          "filename": "photo-2025-07-09-08-37-55.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-37-55_1.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 31",
          "filename": "photo-2025-07-09-08-37-55_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-37-55_2.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 32",
          "filename": "photo-2025-07-09-08-37-55_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Viatge_Museu_BMW_03_07_2025/photo-2025-07-09-08-37-55_3.jpg",
          "alt": "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025 33",
          "filename": "photo-2025-07-09-08-37-55_3.jpg"
        }
      ]
    },
    {
      "title": "Cars & Coffee 20/07/2025",
      "sourceFolder": "phocagallery/sortides/Any_2025/Cars",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-07-20-16-50-17.jpg",
          "alt": "Cars & Coffee 20/07/2025 1",
          "filename": "photo-2025-07-20-16-50-17.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-07-20-16-50-17_1.jpg",
          "alt": "Cars & Coffee 20/07/2025 2",
          "filename": "photo-2025-07-20-16-50-17_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-07-20-16-50-17_2.jpg",
          "alt": "Cars & Coffee 20/07/2025 3",
          "filename": "photo-2025-07-20-16-50-17_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-07-20-16-50-17_3.jpg",
          "alt": "Cars & Coffee 20/07/2025 4",
          "filename": "photo-2025-07-20-16-50-17_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-07-20-16-50-17_4.jpg",
          "alt": "Cars & Coffee 20/07/2025 5",
          "filename": "photo-2025-07-20-16-50-17_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-07-20-16-50-17_5.jpg",
          "alt": "Cars & Coffee 20/07/2025 6",
          "filename": "photo-2025-07-20-16-50-17_5.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-07-20-16-50-44.jpg",
          "alt": "Cars & Coffee 20/07/2025 7",
          "filename": "photo-2025-07-20-16-50-44.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-07-20-16-50-44_1.jpg",
          "alt": "Cars & Coffee 20/07/2025 8",
          "filename": "photo-2025-07-20-16-50-44_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-07-20-16-50-45.jpg",
          "alt": "Cars & Coffee 20/07/2025 9",
          "filename": "photo-2025-07-20-16-50-45.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-07-20-16-50-45_1.jpg",
          "alt": "Cars & Coffee 20/07/2025 10",
          "filename": "photo-2025-07-20-16-50-45_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-07-20-16-50-45_2.jpg",
          "alt": "Cars & Coffee 20/07/2025 11",
          "filename": "photo-2025-07-20-16-50-45_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-07-20-16-50-45_3.jpg",
          "alt": "Cars & Coffee 20/07/2025 12",
          "filename": "photo-2025-07-20-16-50-45_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-07-20-16-50-45_4.jpg",
          "alt": "Cars & Coffee 20/07/2025 13",
          "filename": "photo-2025-07-20-16-50-45_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-07-20-16-50-45_5.jpg",
          "alt": "Cars & Coffee 20/07/2025 14",
          "filename": "photo-2025-07-20-16-50-45_5.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-07-20-16-50-45_6.jpg",
          "alt": "Cars & Coffee 20/07/2025 15",
          "filename": "photo-2025-07-20-16-50-45_6.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-07-20-16-50-46.jpg",
          "alt": "Cars & Coffee 20/07/2025 16",
          "filename": "photo-2025-07-20-16-50-46.jpg"
        }
      ]
    },
    {
      "title": "Cars & Coffee 14/09/2025",
      "sourceFolder": "phocagallery/sortides/Any_2025/Cars",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-09-16-08-54-39.jpg",
          "alt": "Cars & Coffee 14/09/2025 1",
          "filename": "photo-2025-09-16-08-54-39.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-09-16-08-54-39_1.jpg",
          "alt": "Cars & Coffee 14/09/2025 2",
          "filename": "photo-2025-09-16-08-54-39_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-09-16-08-54-40.jpg",
          "alt": "Cars & Coffee 14/09/2025 3",
          "filename": "photo-2025-09-16-08-54-40.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-09-16-08-54-40_1.jpg",
          "alt": "Cars & Coffee 14/09/2025 4",
          "filename": "photo-2025-09-16-08-54-40_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-09-16-08-54-40_2.jpg",
          "alt": "Cars & Coffee 14/09/2025 5",
          "filename": "photo-2025-09-16-08-54-40_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-09-16-08-54-40_3.jpg",
          "alt": "Cars & Coffee 14/09/2025 6",
          "filename": "photo-2025-09-16-08-54-40_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-09-16-08-54-40_4.jpg",
          "alt": "Cars & Coffee 14/09/2025 7",
          "filename": "photo-2025-09-16-08-54-40_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-09-16-08-54-40_5.jpg",
          "alt": "Cars & Coffee 14/09/2025 8",
          "filename": "photo-2025-09-16-08-54-40_5.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-09-16-08-54-41.jpg",
          "alt": "Cars & Coffee 14/09/2025 9",
          "filename": "photo-2025-09-16-08-54-41.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-09-16-08-54-41_1.jpg",
          "alt": "Cars & Coffee 14/09/2025 10",
          "filename": "photo-2025-09-16-08-54-41_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-09-16-08-54-41_2.jpg",
          "alt": "Cars & Coffee 14/09/2025 11",
          "filename": "photo-2025-09-16-08-54-41_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-09-16-08-54-41_3.jpg",
          "alt": "Cars & Coffee 14/09/2025 12",
          "filename": "photo-2025-09-16-08-54-41_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-09-16-08-54-41_4.jpg",
          "alt": "Cars & Coffee 14/09/2025 13",
          "filename": "photo-2025-09-16-08-54-41_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-09-16-08-54-41_5.jpg",
          "alt": "Cars & Coffee 14/09/2025 14",
          "filename": "photo-2025-09-16-08-54-41_5.jpg"
        }
      ]
    },
    {
      "title": "VI Rally Turistic 04-05/10/2025",
      "sourceFolder": "phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-19-50.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 1",
          "filename": "photo-2025-10-06-12-19-50.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-19-50_1.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 2",
          "filename": "photo-2025-10-06-12-19-50_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-19-50_2.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 3",
          "filename": "photo-2025-10-06-12-19-50_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-19-50_3.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 4",
          "filename": "photo-2025-10-06-12-19-50_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-20-39.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 5",
          "filename": "photo-2025-10-06-12-20-39.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-20-39_1.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 6",
          "filename": "photo-2025-10-06-12-20-39_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-20-39_2.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 7",
          "filename": "photo-2025-10-06-12-20-39_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-20-39_3.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 8",
          "filename": "photo-2025-10-06-12-20-39_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-20-39_4.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 9",
          "filename": "photo-2025-10-06-12-20-39_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-21-11.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 10",
          "filename": "photo-2025-10-06-12-21-11.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-21-11_1.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 11",
          "filename": "photo-2025-10-06-12-21-11_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-21-11_2.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 12",
          "filename": "photo-2025-10-06-12-21-11_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-21-12.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 13",
          "filename": "photo-2025-10-06-12-21-12.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-21-12_1.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 14",
          "filename": "photo-2025-10-06-12-21-12_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-21-51.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 15",
          "filename": "photo-2025-10-06-12-21-51.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-21-51_1.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 16",
          "filename": "photo-2025-10-06-12-21-51_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-21-52.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 17",
          "filename": "photo-2025-10-06-12-21-52.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-21-52_1.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 18",
          "filename": "photo-2025-10-06-12-21-52_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-21-52_2.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 19",
          "filename": "photo-2025-10-06-12-21-52_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-21-52_3.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 20",
          "filename": "photo-2025-10-06-12-21-52_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-22-57.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 21",
          "filename": "photo-2025-10-06-12-22-57.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-22-58.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 22",
          "filename": "photo-2025-10-06-12-22-58.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-22-58_1.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 23",
          "filename": "photo-2025-10-06-12-22-58_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-22-58_2.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 24",
          "filename": "photo-2025-10-06-12-22-58_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-22-58_3.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 25",
          "filename": "photo-2025-10-06-12-22-58_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-22-58_4.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 26",
          "filename": "photo-2025-10-06-12-22-58_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-22-58_5.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 27",
          "filename": "photo-2025-10-06-12-22-58_5.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/VI_Rally_Turistic_10_2025/photo-2025-10-06-12-23-35.jpg",
          "alt": "VI Rally Turistic 04-05/10/2025 28",
          "filename": "photo-2025-10-06-12-23-35.jpg"
        }
      ]
    },
    {
      "title": "Cars & Coffee 26/10/2025",
      "sourceFolder": "phocagallery/sortides/Any_2025/Cars",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-10-26-18-09-13.jpg",
          "alt": "Cars & Coffee 26/10/2025 1",
          "filename": "photo-2025-10-26-18-09-13.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-10-26-18-09-14.jpg",
          "alt": "Cars & Coffee 26/10/2025 2",
          "filename": "photo-2025-10-26-18-09-14.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-10-26-18-09-14_1.jpg",
          "alt": "Cars & Coffee 26/10/2025 3",
          "filename": "photo-2025-10-26-18-09-14_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-10-26-18-09-15.jpg",
          "alt": "Cars & Coffee 26/10/2025 4",
          "filename": "photo-2025-10-26-18-09-15.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-10-26-18-09-15_1.jpg",
          "alt": "Cars & Coffee 26/10/2025 5",
          "filename": "photo-2025-10-26-18-09-15_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-10-26-18-09-15_2.jpg",
          "alt": "Cars & Coffee 26/10/2025 6",
          "filename": "photo-2025-10-26-18-09-15_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-10-26-18-09-55.jpg",
          "alt": "Cars & Coffee 26/10/2025 7",
          "filename": "photo-2025-10-26-18-09-55.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-10-26-18-09-55_1.jpg",
          "alt": "Cars & Coffee 26/10/2025 8",
          "filename": "photo-2025-10-26-18-09-55_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-10-26-18-09-56.jpg",
          "alt": "Cars & Coffee 26/10/2025 9",
          "filename": "photo-2025-10-26-18-09-56.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-10-26-18-09-56_1.jpg",
          "alt": "Cars & Coffee 26/10/2025 10",
          "filename": "photo-2025-10-26-18-09-56_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Cars/photo-2025-10-26-18-09-56_2.jpg",
          "alt": "Cars & Coffee 26/10/2025 11",
          "filename": "photo-2025-10-26-18-09-56_2.jpg"
        }
      ]
    },
    {
      "title": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025",
      "sourceFolder": "phocagallery/sortides/Any_2025/Sopar_20_Aniversari",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-52-40.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 1",
          "filename": "photo-2025-11-22-09-52-40.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-52-41.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 2",
          "filename": "photo-2025-11-22-09-52-41.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-52-41_1.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 3",
          "filename": "photo-2025-11-22-09-52-41_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-52-41_2.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 4",
          "filename": "photo-2025-11-22-09-52-41_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-53-44.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 5",
          "filename": "photo-2025-11-22-09-53-44.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-53-44_1.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 6",
          "filename": "photo-2025-11-22-09-53-44_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-53-45.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 7",
          "filename": "photo-2025-11-22-09-53-45.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-53-45_1.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 8",
          "filename": "photo-2025-11-22-09-53-45_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-53-45_2.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 9",
          "filename": "photo-2025-11-22-09-53-45_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-53-45_3.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 10",
          "filename": "photo-2025-11-22-09-53-45_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-53-46.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 11",
          "filename": "photo-2025-11-22-09-53-46.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-54-39.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 12",
          "filename": "photo-2025-11-22-09-54-39.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-54-40.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 13",
          "filename": "photo-2025-11-22-09-54-40.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-54-40_1.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 14",
          "filename": "photo-2025-11-22-09-54-40_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-54-40_2.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 15",
          "filename": "photo-2025-11-22-09-54-40_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-54-40_3.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 16",
          "filename": "photo-2025-11-22-09-54-40_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-54-41.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 17",
          "filename": "photo-2025-11-22-09-54-41.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-54-41_1.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 18",
          "filename": "photo-2025-11-22-09-54-41_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-55-30.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 19",
          "filename": "photo-2025-11-22-09-55-30.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-55-32.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 20",
          "filename": "photo-2025-11-22-09-55-32.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-55-32_1.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 21",
          "filename": "photo-2025-11-22-09-55-32_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-55-33.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 22",
          "filename": "photo-2025-11-22-09-55-33.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-55-33_1.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 23",
          "filename": "photo-2025-11-22-09-55-33_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-55-33_2.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 24",
          "filename": "photo-2025-11-22-09-55-33_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-55-33_3.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 25",
          "filename": "photo-2025-11-22-09-55-33_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-55-34.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 26",
          "filename": "photo-2025-11-22-09-55-34.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-55-34_1.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 27",
          "filename": "photo-2025-11-22-09-55-34_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-56-06.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 28",
          "filename": "photo-2025-11-22-09-56-06.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-56-07.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 29",
          "filename": "photo-2025-11-22-09-56-07.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-56-07_1.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 30",
          "filename": "photo-2025-11-22-09-56-07_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-56-36.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 31",
          "filename": "photo-2025-11-22-09-56-36.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-56-36_1.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 32",
          "filename": "photo-2025-11-22-09-56-36_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-56-37.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 33",
          "filename": "photo-2025-11-22-09-56-37.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-56-37_1.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 34",
          "filename": "photo-2025-11-22-09-56-37_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-56-37_2.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 35",
          "filename": "photo-2025-11-22-09-56-37_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-56-37_3.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 36",
          "filename": "photo-2025-11-22-09-56-37_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-57-26.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 37",
          "filename": "photo-2025-11-22-09-57-26.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-57-27.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 38",
          "filename": "photo-2025-11-22-09-57-27.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-57-27_1.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 39",
          "filename": "photo-2025-11-22-09-57-27_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-57-27_2.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 40",
          "filename": "photo-2025-11-22-09-57-27_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-57-27_3.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 41",
          "filename": "photo-2025-11-22-09-57-27_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-57-28.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 42",
          "filename": "photo-2025-11-22-09-57-28.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-57-28_1.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 43",
          "filename": "photo-2025-11-22-09-57-28_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-57-28_2.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 44",
          "filename": "photo-2025-11-22-09-57-28_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-57-53.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 45",
          "filename": "photo-2025-11-22-09-57-53.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/Sopar_20_Aniversari/photo-2025-11-22-09-57-53_1.jpg",
          "alt": "SOPAR 20 ANIVERSARI ANDORRA 08/11/2025 46",
          "filename": "photo-2025-11-22-09-57-53_1.jpg"
        }
      ]
    }
  ],
  "sortides_2026": [
    {
      "title": "1r Cars & Coffee",
      "sourceFolder": "phocagallery/sortides/Any_2026/1_Cars_",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/1_Cars_/photo-2026-03-01-14-26-53.jpg",
          "alt": "1r Cars & Coffee 1",
          "filename": "photo-2026-03-01-14-26-53.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/1_Cars_/photo-2026-03-01-14-26-54.jpg",
          "alt": "1r Cars & Coffee 2",
          "filename": "photo-2026-03-01-14-26-54.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/1_Cars_/photo-2026-03-01-14-26-54_1.jpg",
          "alt": "1r Cars & Coffee 3",
          "filename": "photo-2026-03-01-14-26-54_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/1_Cars_/photo-2026-03-01-14-26-54_2.jpg",
          "alt": "1r Cars & Coffee 4",
          "filename": "photo-2026-03-01-14-26-54_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/1_Cars_/photo-2026-03-01-14-26-54_3.jpg",
          "alt": "1r Cars & Coffee 5",
          "filename": "photo-2026-03-01-14-26-54_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/1_Cars_/photo-2026-03-01-14-26-54_4.jpg",
          "alt": "1r Cars & Coffee 6",
          "filename": "photo-2026-03-01-14-26-54_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/1_Cars_/photo-2026-03-01-14-26-55.jpg",
          "alt": "1r Cars & Coffee 7",
          "filename": "photo-2026-03-01-14-26-55.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/1_Cars_/photo-2026-03-01-14-26-58.jpg",
          "alt": "1r Cars & Coffee 8",
          "filename": "photo-2026-03-01-14-26-58.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/1_Cars_/photo-2026-03-01-14-26-58_1.jpg",
          "alt": "1r Cars & Coffee 9",
          "filename": "photo-2026-03-01-14-26-58_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/1_Cars_/photo-2026-03-01-14-26-58_2.jpg",
          "alt": "1r Cars & Coffee 10",
          "filename": "photo-2026-03-01-14-26-58_2.jpg"
        }
      ]
    },
    {
      "title": "Sortida a Cerdanya 29/03/2026",
      "sourceFolder": "phocagallery/sortides/Any_2026/Sortida_Cerdanya_29_03",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/Sortida_Cerdanya_29_03/photo-2026-03-29-20-09-04%201.jpg",
          "alt": "Sortida a Cerdanya 29/03/2026 1",
          "filename": "photo-2026-03-29-20-09-04 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/Sortida_Cerdanya_29_03/photo-2026-03-29-20-09-04%202.jpg",
          "alt": "Sortida a Cerdanya 29/03/2026 2",
          "filename": "photo-2026-03-29-20-09-04 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/Sortida_Cerdanya_29_03/photo-2026-03-29-20-09-04%203.jpg",
          "alt": "Sortida a Cerdanya 29/03/2026 3",
          "filename": "photo-2026-03-29-20-09-04 3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/Sortida_Cerdanya_29_03/photo-2026-03-29-20-09-04.jpg",
          "alt": "Sortida a Cerdanya 29/03/2026 4",
          "filename": "photo-2026-03-29-20-09-04.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/Sortida_Cerdanya_29_03/photo-2026-03-29-20-09-46%201.jpg",
          "alt": "Sortida a Cerdanya 29/03/2026 5",
          "filename": "photo-2026-03-29-20-09-46 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/Sortida_Cerdanya_29_03/photo-2026-03-29-20-09-46%202.jpg",
          "alt": "Sortida a Cerdanya 29/03/2026 6",
          "filename": "photo-2026-03-29-20-09-46 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/Sortida_Cerdanya_29_03/photo-2026-03-29-20-09-46.jpg",
          "alt": "Sortida a Cerdanya 29/03/2026 7",
          "filename": "photo-2026-03-29-20-09-46.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/Sortida_Cerdanya_29_03/photo-2026-03-29-20-09-47%201.jpg",
          "alt": "Sortida a Cerdanya 29/03/2026 8",
          "filename": "photo-2026-03-29-20-09-47 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/Sortida_Cerdanya_29_03/photo-2026-03-29-20-09-47%202.jpg",
          "alt": "Sortida a Cerdanya 29/03/2026 9",
          "filename": "photo-2026-03-29-20-09-47 2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/Sortida_Cerdanya_29_03/photo-2026-03-29-20-09-47.jpg",
          "alt": "Sortida a Cerdanya 29/03/2026 10",
          "filename": "photo-2026-03-29-20-09-47.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/Sortida_Cerdanya_29_03/photo-2026-03-29-20-10-48%201.jpg",
          "alt": "Sortida a Cerdanya 29/03/2026 11",
          "filename": "photo-2026-03-29-20-10-48 1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/Sortida_Cerdanya_29_03/photo-2026-03-29-20-10-48%202.jpg",
          "alt": "Sortida a Cerdanya 29/03/2026 12",
          "filename": "photo-2026-03-29-20-10-48 2.jpg"
        }
      ]
    },
    {
      "title": "2n Cars & Coffee",
      "sourceFolder": "phocagallery/sortides/Any_2026/2_Cars_",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/2_Cars_/photo-2026-04-19-20-02-35.jpg",
          "alt": "2n Cars & Coffee 1",
          "filename": "photo-2026-04-19-20-02-35.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/2_Cars_/photo-2026-04-19-20-02-35_1.jpg",
          "alt": "2n Cars & Coffee 2",
          "filename": "photo-2026-04-19-20-02-35_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/2_Cars_/photo-2026-04-19-20-02-35_2.jpg",
          "alt": "2n Cars & Coffee 3",
          "filename": "photo-2026-04-19-20-02-35_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/2_Cars_/photo-2026-04-19-20-02-35_3.jpg",
          "alt": "2n Cars & Coffee 4",
          "filename": "photo-2026-04-19-20-02-35_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/2_Cars_/photo-2026-04-19-20-02-35_4.jpg",
          "alt": "2n Cars & Coffee 5",
          "filename": "photo-2026-04-19-20-02-35_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/2_Cars_/photo-2026-04-19-20-02-35_5.jpg",
          "alt": "2n Cars & Coffee 6",
          "filename": "photo-2026-04-19-20-02-35_5.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/2_Cars_/photo-2026-04-19-20-02-35_6.jpg",
          "alt": "2n Cars & Coffee 7",
          "filename": "photo-2026-04-19-20-02-35_6.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/2_Cars_/photo-2026-04-19-20-02-36.jpg",
          "alt": "2n Cars & Coffee 8",
          "filename": "photo-2026-04-19-20-02-36.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/2_Cars_/photo-2026-04-19-20-02-36_1.jpg",
          "alt": "2n Cars & Coffee 9",
          "filename": "photo-2026-04-19-20-02-36_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/2_Cars_/photo-2026-04-19-20-02-36_2.jpg",
          "alt": "2n Cars & Coffee 10",
          "filename": "photo-2026-04-19-20-02-36_2.jpg"
        }
      ]
    },
    {
      "title": "4º Cars & Coffee 19/07/2026",
      "sourceFolder": "phocagallery/sortides/Any_2026/4_Cars_Coffee_19_07",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/4_Cars_Coffee_19_07/cars-coffee-2026-07-19-01.jpg",
          "alt": "4º Cars & Coffee 19/07/2026 1",
          "filename": "cars-coffee-2026-07-19-01.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/4_Cars_Coffee_19_07/cars-coffee-2026-07-19-02.jpg",
          "alt": "4º Cars & Coffee 19/07/2026 2",
          "filename": "cars-coffee-2026-07-19-02.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/4_Cars_Coffee_19_07/cars-coffee-2026-07-19-03.jpg",
          "alt": "4º Cars & Coffee 19/07/2026 3",
          "filename": "cars-coffee-2026-07-19-03.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/4_Cars_Coffee_19_07/cars-coffee-2026-07-19-04.jpg",
          "alt": "4º Cars & Coffee 19/07/2026 4",
          "filename": "cars-coffee-2026-07-19-04.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/4_Cars_Coffee_19_07/cars-coffee-2026-07-19-05.jpg",
          "alt": "4º Cars & Coffee 19/07/2026 5",
          "filename": "cars-coffee-2026-07-19-05.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/4_Cars_Coffee_19_07/cars-coffee-2026-07-19-06.jpg",
          "alt": "4º Cars & Coffee 19/07/2026 6",
          "filename": "cars-coffee-2026-07-19-06.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/4_Cars_Coffee_19_07/cars-coffee-2026-07-19-07.jpg",
          "alt": "4º Cars & Coffee 19/07/2026 7",
          "filename": "cars-coffee-2026-07-19-07.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/4_Cars_Coffee_19_07/cars-coffee-2026-07-19-08.jpg",
          "alt": "4º Cars & Coffee 19/07/2026 8",
          "filename": "cars-coffee-2026-07-19-08.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/4_Cars_Coffee_19_07/cars-coffee-2026-07-19-09.jpg",
          "alt": "4º Cars & Coffee 19/07/2026 9",
          "filename": "cars-coffee-2026-07-19-09.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/4_Cars_Coffee_19_07/cars-coffee-2026-07-19-10.jpg",
          "alt": "4º Cars & Coffee 19/07/2026 10",
          "filename": "cars-coffee-2026-07-19-10.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/4_Cars_Coffee_19_07/cars-coffee-2026-07-19-11.jpg",
          "alt": "4º Cars & Coffee 19/07/2026 11",
          "filename": "cars-coffee-2026-07-19-11.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/4_Cars_Coffee_19_07/cars-coffee-2026-07-19-12.jpg",
          "alt": "4º Cars & Coffee 19/07/2026 12",
          "filename": "cars-coffee-2026-07-19-12.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/4_Cars_Coffee_19_07/cars-coffee-2026-07-19-13.jpg",
          "alt": "4º Cars & Coffee 19/07/2026 13",
          "filename": "cars-coffee-2026-07-19-13.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/4_Cars_Coffee_19_07/cars-coffee-2026-07-19-14.jpg",
          "alt": "4º Cars & Coffee 19/07/2026 14",
          "filename": "cars-coffee-2026-07-19-14.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/4_Cars_Coffee_19_07/cars-coffee-2026-07-19-15.jpg",
          "alt": "4º Cars & Coffee 19/07/2026 15",
          "filename": "cars-coffee-2026-07-19-15.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/4_Cars_Coffee_19_07/cars-coffee-2026-07-19-16.jpg",
          "alt": "4º Cars & Coffee 19/07/2026 16",
          "filename": "cars-coffee-2026-07-19-16.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2026/4_Cars_Coffee_19_07/cars-coffee-2026-07-19-17.jpg",
          "alt": "4º Cars & Coffee 19/07/2026 17",
          "filename": "cars-coffee-2026-07-19-17.jpg"
        }
      ]
    }
  ]
};
