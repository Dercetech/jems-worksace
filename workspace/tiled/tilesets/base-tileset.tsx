<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.8" tiledversion="1.8.2" name="base-tileset" tilewidth="16" tileheight="16" spacing="2" margin="1" tilecount="784" columns="28">
 <editorsettings>
  <export target="../../../public/tilesets/base-tileset.json" format="json"/>
 </editorsettings>
 <image source="../../../public/tilesets/tileset_16_16_28cols_margin1_spacing2.png" width="504" height="504"/>
 <tile id="1">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="4">
  <animation>
   <frame tileid="4" duration="500"/>
   <frame tileid="5" duration="200"/>
   <frame tileid="6" duration="100"/>
   <frame tileid="7" duration="100"/>
  </animation>
 </tile>
 <tile id="27">
  <objectgroup draworder="index" id="2">
   <object id="1" x="4.89164" y="4.08669" width="4.08669" height="7.86378"/>
   <object id="2" x="8.91641" y="9.28793" width="3.52941" height="2.66254"/>
  </objectgroup>
 </tile>
 <tile id="28">
  <properties>
   <property name="collides" type="bool" value="true"/>
   <property name="tileType" value="forcefield"/>
  </properties>
 </tile>
 <tile id="57">
  <properties>
   <property name="collides" type="bool" value="true"/>
   <property name="tileType" value="ground"/>
  </properties>
 </tile>
</tileset>
