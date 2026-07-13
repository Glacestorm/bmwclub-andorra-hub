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
    }
  ],
  "sortides_2025": [
    {
      "title": "Cars & Coffee 23/02/2025",
      "sourceFolder": "phocagallery/sortides/Any_2025 (origen)",
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
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-02-25-09-00-41_3.jpg",
          "alt": "Cars & Coffee 23/02/2025 3",
          "filename": "photo-2025-02-25-09-00-41_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-02-25-09-00-42_2.jpg",
          "alt": "Cars & Coffee 23/02/2025 4",
          "filename": "photo-2025-02-25-09-00-42_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-02-25-09-01-09.jpg",
          "alt": "Cars & Coffee 23/02/2025 5",
          "filename": "photo-2025-02-25-09-01-09.jpg"
        }
      ],
      "note": "Recuperat segons data del fitxer origen."
    },
    {
      "title": "Sortida a Espanya 30/03/2025",
      "sourceFolder": "phocagallery/sortides/Any_2025 (origen)",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-30-19-13-28.jpg",
          "alt": "Sortida a Espanya 30/03/2025 1",
          "filename": "photo-2025-03-30-19-13-28.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-30-19-13-29_1.jpg",
          "alt": "Sortida a Espanya 30/03/2025 2",
          "filename": "photo-2025-03-30-19-13-29_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-30-19-13-29_2.jpg",
          "alt": "Sortida a Espanya 30/03/2025 3",
          "filename": "photo-2025-03-30-19-13-29_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-30-19-13-29_3.jpg",
          "alt": "Sortida a Espanya 30/03/2025 4",
          "filename": "photo-2025-03-30-19-13-29_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-30-19-13-29_5.jpg",
          "alt": "Sortida a Espanya 30/03/2025 5",
          "filename": "photo-2025-03-30-19-13-29_5.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-31-09-17-39.jpg",
          "alt": "Sortida a Espanya 30/03/2025 6",
          "filename": "photo-2025-03-31-09-17-39.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-31-09-17-40_1.jpg",
          "alt": "Sortida a Espanya 30/03/2025 7",
          "filename": "photo-2025-03-31-09-17-40_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-31-09-17-40_2.jpg",
          "alt": "Sortida a Espanya 30/03/2025 8",
          "filename": "photo-2025-03-31-09-17-40_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-31-09-17-40_3.jpg",
          "alt": "Sortida a Espanya 30/03/2025 9",
          "filename": "photo-2025-03-31-09-17-40_3.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-03-31-09-17-40_4.jpg",
          "alt": "Sortida a Espanya 30/03/2025 10",
          "filename": "photo-2025-03-31-09-17-40_4.jpg"
        }
      ]
    },
    {
      "title": "Cars & Coffee 13/04/2025",
      "sourceFolder": "phocagallery/sortides/Any_2025 (origen)",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-04-13-13-06-46_1.jpg",
          "alt": "Cars & Coffee 13/04/2025 1",
          "filename": "photo-2025-04-13-13-06-46_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-04-13-13-06-46_2.jpg",
          "alt": "Cars & Coffee 13/04/2025 2",
          "filename": "photo-2025-04-13-13-06-46_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-04-13-13-06-46_4.jpg",
          "alt": "Cars & Coffee 13/04/2025 3",
          "filename": "photo-2025-04-13-13-06-46_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-04-13-13-06-46_6.jpg",
          "alt": "Cars & Coffee 13/04/2025 4",
          "filename": "photo-2025-04-13-13-06-46_6.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-04-13-13-06-47.jpg",
          "alt": "Cars & Coffee 13/04/2025 5",
          "filename": "photo-2025-04-13-13-06-47.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-04-13-13-06-47_1.jpg",
          "alt": "Cars & Coffee 13/04/2025 6",
          "filename": "photo-2025-04-13-13-06-47_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-04-13-13-06-47_3.jpg",
          "alt": "Cars & Coffee 13/04/2025 7",
          "filename": "photo-2025-04-13-13-06-47_3.jpg"
        }
      ]
    },
    {
      "title": "Sortida a França 18/05/2025",
      "sourceFolder": "phocagallery/sortides/Any_2025 (origen)",
      "images": [
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-20-11_1.jpg",
          "alt": "Sortida a França 18/05/2025 1",
          "filename": "photo-2025-05-19-16-20-11_1.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-20-11_2.jpg",
          "alt": "Sortida a França 18/05/2025 2",
          "filename": "photo-2025-05-19-16-20-11_2.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-20-11_5.jpg",
          "alt": "Sortida a França 18/05/2025 3",
          "filename": "photo-2025-05-19-16-20-11_5.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-21-00_4.jpg",
          "alt": "Sortida a França 18/05/2025 4",
          "filename": "photo-2025-05-19-16-21-00_4.jpg"
        },
        {
          "src": "/legacy-mirror/images/phocagallery/sortides/Any_2025/photo-2025-05-19-16-21-01.jpg",
          "alt": "Sortida a França 18/05/2025 5",
          "filename": "photo-2025-05-19-16-21-01.jpg"
        }
      ],
      "note": "Recuperat segons data del fitxer origen."
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
    }
  ]
};
